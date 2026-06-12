import { Box, Button, Group, Text, Title } from '@mantine/core';
import { IconLock, IconTrophy } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { type SecretStatus } from '@drawn-lights-demo/shared';
import showsConst from '../playstation_shows.json';

interface SecretStatusBlockProps {
  status: SecretStatus;
}

export function SecretStatusBlock({ status }: SecretStatusBlockProps) {
  const { t } = useTranslation();

  const handleWatchWinningShow = () => {
    if (!status.combination) return;
    const { assetOne, assetTwo, assetThree, assetFour, sound } = status.combination;
    const assets = [assetOne, assetTwo, assetThree, assetFour].filter(Boolean);
    const combinationName = assets.join(',');
    const fullName = `source_0_${combinationName}${sound !== 'none' ? `_${sound}` : '-optimized'}.mp4`;
    const link = showsConst.find((show) => !show.isVr && show.fullName === fullName)?.link;
    if (link) {
      window.open(link, '_blank');
    }
  };

  const handleChallenge = () => {
    const formationsEl = document.getElementById('formations-section');
    if (formationsEl) {
      formationsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (status.found) {
    return (
      <Box
        style={{
          margin: '24px auto',
          maxWidth: 560,
          padding: '24px',
          borderRadius: '12px',
          border: '2px solid #2f9e44',
          backgroundColor: '#ebfbee',
          textAlign: 'center',
        }}
      >
        <Group justify="center" mb="xs">
          <IconTrophy size={32} color="#2f9e44" />
        </Group>
        <Title order={3} c="green.8">{t('secret_found_title')}</Title>
        <Text c="green.7" mt="xs">{t('secret_found_subtitle')}</Text>
        <Button
          mt="md"
          color="green"
          onClick={handleWatchWinningShow}
        >
          {t('secret_cta_watch')}
        </Button>
      </Box>
    );
  }

  return (
    <Box
      style={{
        margin: '24px auto',
        maxWidth: 560,
        padding: '24px',
        borderRadius: '12px',
        border: '2px solid #7048e8',
        backgroundColor: '#f3f0ff',
        textAlign: 'center',
      }}
    >
      <Group justify="center" mb="xs">
        <IconLock size={32} color="#7048e8" />
      </Group>
      <Title order={3} c="violet.7">{t('secret_not_found_title')}</Title>
      <Text c="violet.6" mt="xs">{t('secret_not_found_subtitle')}</Text>
      <Button
        mt="md"
        color="violet"
        onClick={handleChallenge}
      >
        {t('secret_cta_challenge')}
      </Button>
    </Box>
  );
}
