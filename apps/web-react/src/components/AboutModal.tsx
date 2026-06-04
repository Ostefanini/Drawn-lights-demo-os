import { useState } from "react";
import { Group, Image, Modal, Stack, Text, Title, Tooltip } from '@mantine/core';
import { useTranslation } from "react-i18next";

const techLogos = [
    { name: "TypeScript", url: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "Node.js", url: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "Mantine", url: "https://cdn.simpleicons.org/mantine/339AF0" },
    { name: "PostgreSQL", url: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { name: "Docker", url: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "GitHub", url: "https://cdn.simpleicons.org/github/181717" },
    { name: "GitHub Actions", url: "https://cdn.simpleicons.org/githubactions/2088FF" },
    { name: "Zod", url: "https://cdn.simpleicons.org/zod/3E67B1" },
    { name: "OpenAPI", url: "https://cdn.simpleicons.org/openapiinitiative/6BA539" },
    { name: "React", url: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "react-i18next", url: "https://cdn.simpleicons.org/i18next/26A69A" },
    { name: "Jest", url: "https://cdn.simpleicons.org/jest/C21325" },
    { name: "NestJS", url: "https://cdn.simpleicons.org/nestjs/E0234E" },
    { name: "Nginx", url: "https://cdn.simpleicons.org/nginx/009639" },
    { name: "Let's Encrypt", url: "https://cdn.simpleicons.org/letsencrypt/003A70" },
    { name: "Prisma", url: "https://cdn.simpleicons.org/prisma/2D3748" },
];

const productLogos = [
    { name: "UserJot", url: "https://cdn.simpleicons.org/userjot/000000", fallback: true },
    { name: "GitHub Projects", url: "https://cdn.simpleicons.org/github/181717" },
    { name: "Markdown", url: "https://cdn.simpleicons.org/markdown/000000" },
    { name: "Claude", url: "https://cdn.simpleicons.org/anthropic/D4A574", fallback: true },
    { name: "Notion", url: "https://cdn.simpleicons.org/notion/000000" },
];

const LogoItem = ({ label, src }: { label: string; src: string }) => {
    const [opened, setOpened] = useState(false);
    const [imgError, setImgError] = useState(false);

    return (
        <Tooltip label={label} opened={opened}>
            {imgError ? (
                <Text
                    size="xs"
                    fw={600}
                    style={{
                        padding: "6px 10px",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        cursor: "default",
                        userSelect: "none",
                    }}
                    onClick={() => setOpened((o) => !o)}
                    onMouseEnter={() =>
                        typeof window !== "undefined" &&
                        window.matchMedia("(hover: hover)").matches &&
                        setOpened(true)
                    }
                    onMouseLeave={() =>
                        typeof window !== "undefined" &&
                        window.matchMedia("(hover: hover)").matches &&
                        setOpened(false)
                    }
                >
                    {label}
                </Text>
            ) : (
                <Image
                    w={36}
                    src={src}
                    alt={label}
                    onError={() => setImgError(true)}
                    onClick={() => setOpened((o) => !o)}
                    onMouseEnter={() =>
                        typeof window !== "undefined" &&
                        window.matchMedia("(hover: hover)").matches &&
                        setOpened(true)
                    }
                    onMouseLeave={() =>
                        typeof window !== "undefined" &&
                        window.matchMedia("(hover: hover)").matches &&
                        setOpened(false)
                    }
                    style={{ cursor: "default" }}
                />
            )}
        </Tooltip>
    );
};

interface AboutModalProps {
    opened: boolean;
    onClose: () => void;
}

export const AboutModal = ({ opened, onClose }: AboutModalProps) => {
    const { t } = useTranslation();

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            centered
            lockScroll={false}
            title={
                <Title order={2} ta="center" style={{ width: "100%" }}>
                    {t("about_title")}
                </Title>
            }
            size="lg"
        >
            <Stack gap="lg">
                <Stack gap="xs">
                    <Text>{t("about_intro")}</Text>
                    <Text c="dimmed" size="sm">{t("about_roles")}</Text>
                </Stack>

                <Stack gap="xs">
                    <Title order={4}>{t("about_tech_title")}</Title>
                    <Group gap="md" wrap="wrap">
                        {techLogos.map((tech) => (
                            <LogoItem key={tech.name} label={tech.name} src={tech.url} />
                        ))}
                    </Group>
                </Stack>

                <Stack gap="xs">
                    <Title order={4}>{t("about_product_title")}</Title>
                    <Group gap="md" wrap="wrap">
                        {productLogos.map((tool) => (
                            <LogoItem key={tool.name} label={tool.name} src={tool.url} />
                        ))}
                    </Group>
                </Stack>
            </Stack>
        </Modal>
    );
};
