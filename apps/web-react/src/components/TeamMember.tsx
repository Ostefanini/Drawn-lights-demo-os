import { Text } from '@mantine/core';

interface TeamMemberProps {
    src: string;
    name: string;
    role: string;
}

export function TeamMember({ src, name, role }: TeamMemberProps) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <img src={src} alt={name} style={{ borderRadius: "50%", height: "36px", width: "36px", objectFit: "cover" }} />
            <Text size="xs" c="dimmed">{name} {role}</Text>
        </div>
    );
}
