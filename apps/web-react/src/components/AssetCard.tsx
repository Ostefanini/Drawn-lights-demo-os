import { type Asset } from "@drawn-lights-game/shared";
import { Card, Image, Group, Text, Badge, Button, Title } from '@mantine/core';
import { IconDrone, IconHourglassEmpty, IconPlaylistAdd } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface AssetCardProps {
    asset: Asset;
    onAddToPlaylist: (asset: Asset) => void;
}

export function AssetCard({ asset, onAddToPlaylist }: AssetCardProps) {
    const { t } = useTranslation();
    return (
        <Card
            key={asset.id}
            style={{
                transition: "transform 0.2s ease-in-out",
                cursor: "pointer",
                position: "relative"
            }}
            onMouseEnter={(e) => {
                if (window.matchMedia("(hover: hover)").matches) {
                    e.currentTarget.style.transform = "scale(1.1)";
                }
            }}
            onMouseLeave={(e) => {
                if (window.matchMedia("(hover: hover)").matches) {
                    e.currentTarget.style.transform = "scale(1)";
                }
            }}
            radius={"md"}
            withBorder
        >
            <Card.Section style={{ position: "relative" }}>
                {asset.video ? (
                    <video
                        src={`/${asset.name}_preview.mp4`}
                        style={{ width: "100%", display: "block" }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls={false}
                    />
                ) : (
                    <Image
                        height={200}
                        width={"auto"}
                        src={`http://localhost:4000/assets/thumbnail/${asset.thumbnail}`}
                        alt={asset.name}
                    />
                )}
            </Card.Section>
            <Group mt="md" mb="xs">
                <Title order={3}>{asset.name}</Title>
                <div style={{ position: "absolute", right: "12px" }}>
                    <Badge color="violet" key={asset.type}>{asset.type}</Badge>
                    {asset.tags.map((tag) => <Badge color="pink" key={tag}>#{tag}</Badge>)}
                </div>
            </Group>

            {asset.description && <Text size="sm" c="dimmed">
                {asset.description}
            </Text>}

            <Group gap="xs" mt="xs">
                <IconDrone size={16} />
                <Text size="sm">{asset.nbUav} {t('drones')}</Text>
                <Text size="sm">•</Text>
                <IconHourglassEmpty size={16} />
                <Text size="sm">{asset.durationSec} {t('seconds')}</Text>
            </Group>

            <Button
                onClick={() => onAddToPlaylist(asset)}
                fullWidth={false}
                size={"xs"}
                color="blue"
                mt="md"
            >
                <IconPlaylistAdd />
            </Button>
        </Card>
    );
}
