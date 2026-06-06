import { type Asset, type Sound } from "@drawn-lights-game/shared";
import { Box, Button, Indicator, Menu, Text } from '@mantine/core';
import { IconCloudComputing, IconPlaylist, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface ComputeMenuProps {
    playlist: Asset[];
    audio: Sound;
    onRemoveFromPlaylist: (asset: Asset) => void;
    onCompute: () => void;
    disabled?: boolean;
}

export function ComputeMenu({ playlist, audio, onRemoveFromPlaylist, onCompute, disabled }: ComputeMenuProps) {
    const { t } = useTranslation();
    if (playlist.length === 0) return null;

    return (
        <Box style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
            <Menu
                transitionProps={{ transition: 'pop-top-right' }}
                width={220}
                withinPortal
                radius="md"
            >
                <Menu.Target>
                    <Indicator 
                    styles={{
                        indicator: {
                            transform: "translateY(-40px)"
                        }
                    }}
                    inline label={playlist.length} size={24}>
                        <Button
                            size="xl"
                            p={20}
                            radius="xl"
                            styles={{
                                root: {
                                    top: -40,
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    boxShadow: "0 8px 16px rgba(102, 126, 234, 0.4)",
                                    border: "3px solid rgba(255, 255, 255, 0.3)",
                                    '&:hover': {
                                        background: "linear-gradient(135deg, #7c8ef5 0%, #8b5bb5 100%)",
                                        boxShadow: "0 12px 24px rgba(102, 126, 234, 0.5)",
                                        border: "1px solid rgba(255, 255, 255, 0.5)",
                                    }
                                }
                            }}
                        >
                            <IconPlaylist size={20} />
                        </Button>
                    </Indicator>
                </Menu.Target>
                <Menu.Dropdown
                    style={{
                        backgroundColor: "#663399",
                        border: "2px solid #667eea",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        transform: "translateY(-30px)",
                    }}
                >
                    <Menu.Label c="white">{t('figures')}</Menu.Label>
                    {playlist.map((asset) => (
                        <Menu.Item
                            key={asset.id}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            style={{ borderBottom: '1px solid white' }}
                            rightSection={
                                <IconTrash
                                    size={16}
                                    color={"red"}
                                    stroke={1.5}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveFromPlaylist(asset);
                                    }}
                                    style={{ cursor: "pointer" }}
                                />
                            }
                        >
                            <Text c="white">
                                {asset.name}
                            </Text>
                        </Menu.Item>
                    ))}


                    <>
                        <Menu.Divider />
                        <Menu.Label c="white">{t('audio')}</Menu.Label>
                        <Menu.Item style={{ borderBottom: '1px solid white' }}>
                            <Text c="white">{audio === "none" ? t('no_sound') : audio}</Text>
                        </Menu.Item>
                    </>

                    <Menu.Item
                        key={"compute"}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        style={{
                            marginTop: '8px',
                        }}
                    >
                        <Button
                            style={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                            }}
                            fullWidth
                            disabled={disabled}
                            onClick={onCompute}
                        >
                            <Text c="white">
                                <IconCloudComputing
                                    size={16}
                                    stroke={1.5}
                                    style={{ cursor: "pointer", marginRight: "8px" }}
                                />
                                {t('compute')}
                            </Text>
                        </Button>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Box >
    );
}
