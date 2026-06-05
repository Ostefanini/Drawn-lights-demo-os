import { type Asset, type CombinationStatus, type Sound, type UserListHighscore } from "@drawn-lights-game/shared";
import {
    Alert,
    Button,
    Center,
    Combobox,
    Divider,
    Group,
    InputBase,
    Title,
    useCombobox
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React from "react";
import { useTranslation } from "react-i18next";
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
    const [canTryAgain, setCanTryAgain] = React.useState<boolean>(computationResult?.foundBy ? true : false);

    const exactOptionMatch = users.some((item) => item === foundBy);
    const filteredOptions = exactOptionMatch || !foundBy
        ? users
        : users.filter((item) => item.toLowerCase().includes(foundBy.toLowerCase().trim()));

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    return (
        <>
            <Divider my="sm" />
            <Title ta='center' order={2}>{t('render_result')}</Title>
            
                        <Center>
                
                      {computationResult?.foundBy && (
                            <Alert 
                            style={{marginBottom: "20px"}}
                            title="Cette combinaison a déjà été trouvée !"
                            color="red" mt="sm">
                                Malheureusement, cette combinaison a déjà été découverte par <strong>{computationResult.foundBy}</strong>.<br />N'hésitez pas à essayer d'autres combinaisons pour tenter de trouver une nouvelle découverte !
                           </Alert>
                        )}
</Center>
            <Center>
                
                      {!computationResult?.foundBy && !computationResult?.isSecretCombinationFound && (
                            <Alert 
                            style={{marginBottom: "20px"}}
                            title="Bravo, vous venez trouver une nouvelle combinaison !"
                            color="green" mt="sm">
                                Entrez votre pseudo pour enregistrer votre découverte dans le classement.
                                <br />
                                Merci d'utiliser un pseudo respectueux et unique.
                                <br/>
                                <br/>
                                PS: Ce n'est pas la combinaison secrète, continuez à chercher pour tenter de la trouver !
                            </Alert>
                        )}
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
                    <Button
                        disabled={computationResult?.foundBy !== null || foundBy === null || foundBy.trim().length === 0 || canTryAgain}
                        onClick={() => {
                            void (async () => {
                                try {
                                    await api.post(`/combinations/attribute?${computeAssetQueryParams(playlist, sound)}`, {
                                        userNickname: foundBy,
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
                    <Button
                    disabled={!canTryAgain}
                    color="purple"
                    onClick={reset}
                    >Try again</Button>
                </Group>
            </Center>
            <Center>
                <div style={{
                    width: "100%",
                    maxWidth: "900px",
                    aspectRatio: "16 / 9",
                    margin: "20px 0"
                }}>
                    <iframe
                        src={showVideo}
                        allow="autoplay; fullscreen"
                        id="videoFrame"
                        allowFullScreen
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            borderRadius: "8px"
                        }}
                    />
                </div>
            </Center>
        </>
    );
};
