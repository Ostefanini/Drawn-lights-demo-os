import { Text } from '@mantine/core';
import { IconBrandLinkedin, IconMail } from '@tabler/icons-react';

interface TeamMemberProps {
    src: string;
    name: string;
    role: string;
    mail: string;
    linkedin: string;
}

export function TeamMember({ src, name, role, mail, linkedin }: TeamMemberProps) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <img src={src} alt={name} style={{ borderRadius: "50%", height: "36px", width: "36px", objectFit: "cover" }} />
            <Text size="xs" c="dimmed">{name} {role}</Text>
            <div style={{ display: "flex", gap: "8px" }}>
                <a href={`mailto:${mail}`} aria-label={`Email ${name}`} style={{ display: "inline-flex", color: "white" }}>
                    <IconMail size={20} />
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${name}`} style={{ display: "inline-flex", color: "white" }}>
                    <IconBrandLinkedin size={20} />
                </a>
            </div>
        </div>
    );
}
