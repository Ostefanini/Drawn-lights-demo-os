import { type Asset, type CombinationStatus, type Sound, type UserListHighscore } from "@drawn-lights-game/shared";
import {
    Alert,
    Button,
    Center,
    Combobox,
    Divider,
    Group,
    InputBase,
    TextInput,
    Title,
    useCombobox
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { computeAssetQueryParams } from "../helpers";
import api from "../services/api";
import type { EmojisInstructions } from "../types/app";

interface ResultSectionProps {
    showVideo: string;
    computationResult: CombinationStatus | null;
    users: string[];
    setUsers: React.Dispatch<React.SetStateAction<string[]>>;
    setEmojisInstructions: (val: EmojisInstructions | null) => void;
    playlist: Asset[];
    sound: Sound;
    reset: () => void;
    setHighscore: (val: UserListHighscore[]) => void;
}

const ALERT_STYLE = { marginBottom: "20px" };

function CombinationStatusAlert({ computationResult }: { computationResult: CombinationStatus | null }) {
    const { t } = useTranslation();

    if (computationResult?.foundBy) {
        return (
            <Alert style={ALERT_STYLE} title={t('combination_already_found_title')} color="red" mt="sm">
                <Trans
                    i18nKey="combination_already_found_msg"
                    values={{ foundBy: computationResult.foundBy }}
                    components={{ strong: <strong />, br: <br /> }}
                />
            </Alert>
        );
    }

    if (computationResult?.isSecretCombinationFound) {
        return (
            <Alert style={ALERT_STYLE} title={t('secret_combination_title')} color="teal" mt="sm">
                <Trans i18nKey="secret_combination_msg" components={{ br: <br /> }} />
            </Alert>
        );
    }

    if (computationResult !== null) {
        return (
            <Alert style={ALERT_STYLE} title={t('new_combination_title')} color="green" mt="sm">
                <Trans i18nKey="new_combination_msg" components={{ br: <br /> }} />
            </Alert>
        );
    }

    return null;
}

export const ResultSection = ({
    showVideo,
    computationResult,
    users,
    setUsers,
    setEmojisInstructions,
    reset,
    playlist,
    sound,
    setHighscore
}: ResultSectionProps) => {
    const { t } = useTranslation();
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [foundBy, setFoundBy] = React.useState<string | null>(computationResult?.foundBy ?? null);
    const [canTryAgain, setCanTryAgain] = React.useState<boolean>(!!computationResult?.foundBy);
    const [email, setEmail] = React.useState<string>("");
    const isEmailValid: boolean = email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const exactOptionMatch = users.some((item) => item === foundBy);
    const filteredOptions = exactOptionMatch || !foundBy
        ? users
        : users.filter((item) => item.toLowerCase().includes(foundBy.toLowerCase().trim()));

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    const isSaveDisabled =
        computationResult?.foundBy !== null ||
        foundBy === null ||
        foundBy.trim().length === 0 ||
        (!isEmailValid && email.length > 0) ||
        canTryAgain;

    return (
        <>
            <Divider my="sm" />
            <Title ta='center' order={2}>{t('render_result')}</Title>

            <Center>
                <CombinationStatusAlert computationResult={computationResult} />
            </Center>

            <Center>
                <Group align="flex-end" gap="sm">
                    <Combobox
                        store={combobox}
                        withinPortal={false}
                        onOptionSubmit={(val) => {
                            if (val === '$create') {
                                setFoundBy(foundBy);
                                if (foundBy) {
                                    setUsers((current) => [...current, foundBy]);
                                }
                            } else {
                                setFoundBy(val);
                            }

                            combobox.closeDropdown();
                        }}
                    >
                        <Combobox.Target>
                            <InputBase
                                label={t('found_by')}
                                rightSection={<Combobox.Chevron />}
                                value={foundBy || ''}
                                disabled={computationResult?.foundBy !== null || canTryAgain}
                                onChange={(event) => {
                                    combobox.openDropdown();
                                    combobox.updateSelectedOptionIndex();
                                    setFoundBy(event.currentTarget.value);
                                }}
                                onClick={() => combobox.openDropdown()}
                                onFocus={() => combobox.openDropdown()}
                                onBlur={() => {
                                    combobox.closeDropdown();
                                    setFoundBy(foundBy || '');
                                }}
                                placeholder={t('attribute_discovery')}
                                rightSectionPointerEvents="none"
                            />
                        </Combobox.Target>

                        <Combobox.Dropdown>
                            <Combobox.Options>
                                {options}
                                {!exactOptionMatch && foundBy && foundBy.trim().length > 0 && (
                                    <Combobox.Option value="$create">{t('create_user', { user: foundBy })}</Combobox.Option>
                                )}
                            </Combobox.Options>
                        </Combobox.Dropdown>
                    </Combobox>
                    {computationResult?.isSecretCombinationFound && !computationResult?.foundBy && (
                        <TextInput
                            label={t('email')}
                            placeholder={t('email_placeholder')}
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            disabled={computationResult?.foundBy !== null || canTryAgain}
                        />
                    )}
                    <Button
                        disabled={isSaveDisabled}
                        onClick={() => {
                            void (async () => {
                                try {
                                    await api.post(`/combinations/attribute?${computeAssetQueryParams(playlist, sound)}`, {
                                        userNickname: foundBy,
                                        email: email.length > 0 ? email : undefined
                                    });
                                    notifications.show({
                                        title: t('success'),
                                        message: t('discovery_recorded'),
                                        color: 'green',
                                    });
                                    setEmojisInstructions(null);
                                    setHighscore(await api.get<UserListHighscore[]>("/users").then(res => res.data));
                                    setCanTryAgain(true);
                                } catch (e) {
                                    console.error("Failed to save combination", e);
                                }
                            })();
                        }}
                    >{t('save')}</Button>
                    {computationResult !== null && (
                        <Button
                            disabled={!canTryAgain}
                            color="purple"
                            onClick={reset}
                        >{t('try_again')}</Button>
                    )}
                </Group>
            </Center>
            <Center>
                <video
                    id="videoFrame"
                    src={showVideo}
                    controls
                    autoPlay
                    playsInline
                    style={{
                        width: "100%",
                        maxWidth: "900px",
                        aspectRatio: "16 / 9",
                        margin: "20px 0",
                        borderRadius: "8px",
                        backgroundColor: "#000"
                    }}
                />
            </Center>
        </>
    );
};
