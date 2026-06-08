import { Button, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { TeamMember } from "./TeamMember.js";

export function TeamInformations({ setOpenAboutModal }: { setOpenAboutModal: (open: boolean) => void }) {
    const { t } = useTranslation();
    return (
        <div style={{ marginTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                <Title ta="center" order={4}>{t('team_title')}</Title>
                <Button 
                onClick={() => setOpenAboutModal(true)}
                size="compact-xs" variant="outline">{t('team_learn_more')}</Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", marginTop: "8px" }}>
                <TeamMember src="/oscar.png" name="Oscar S." role={t('team_oscar_role')} mail="oscar.stefanini1@gmail.com" linkedin="https://www.linkedin.com/in/oscar-stefanini1/" />
                <TeamMember src="/karine.jpg" name="Karine M." role={t('team_karine_role')} mail="karine.majdalani@gmail.com" linkedin="https://www.linkedin.com/in/karine-majdalani" />
            </div>
        </div>
    );
}
