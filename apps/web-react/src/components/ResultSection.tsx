import {
    Title, Center, Group, Combobox, InputBase, Button, Divider, useCombobox
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { type Asset, type Sound, type UserListHighscore } from "@drawn-lights-game/shared";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import { computeAssetQueryParams } from "../helpers";

interface ResultSectionProps {
    showVideo: string;
    foundBy: string | null;
    setFoundBy: (val: string | null) => void;
    users: string[];
    setUsers: React.Dispatch<React.SetStateAction<string[]>>;
    isNew: boolean | null;
    setIsNew: (val: boolean | null) => void;
    playlist: Asset[];
    sound: Sound;
    setHighscore: (val: UserListHighscore[]) => void;
}

export const ResultSection = ({
    showVideo,
    foundBy,
    setFoundBy,
    users,
    setUsers,
    isNew,
    setIsNew,
    playlist,
    sound,
    setHighscore
}: ResultSectionProps) => {
    const { t } = useTranslation();
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

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
                                disabled={!isNew}
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
                        disabled={!isNew}
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
                                    setIsNew(null);
                                    setHighscore(await api.get<UserListHighscore[]>("/users").then(res => res.data));
                                } catch (e) {
                                    console.error("Failed to save combination", e);
                                }
                            })();
                        }}
                    >{t('save')}</Button>
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
