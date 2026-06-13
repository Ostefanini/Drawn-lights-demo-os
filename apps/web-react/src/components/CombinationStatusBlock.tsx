import { type SecretCombinationStatus } from "@drawn-lights-game/shared";
import { Alert, Button, Center, Stack, Text } from '@mantine/core';
import { IconSearch, IconSparkles, IconTrophy } from "@tabler/icons-react";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface CombinationStatusBlockProps {
  secretStatus: SecretCombinationStatus | null;
  showScores: boolean;
  onToggleScores: () => void;
}

interface StatusAlertProps {
  title: ReactNode;
  color: string;
  borderColor: string;
  backgroundColor: string;
  buttonColor: string;
  children: ReactNode;
  showScores: boolean;
  onToggleScores: () => void;
  hideScoresLabel: string;
  showScoresLabel: string;
}

const StatusAlert = ({
  title,
  color,
  borderColor,
  backgroundColor,
  buttonColor,
  children,
  showScores,
  onToggleScores,
  hideScoresLabel,
  showScoresLabel,
}: StatusAlertProps) => (
  <Center>
    <Alert
      title={title}
      color={color}
      mt="md"
      style={{
        borderRadius: "12px",
        backgroundColor,
        borderColor,
        maxWidth: "400px",
      }}
      styles={{
        title: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        },
      }}
    >
      <Stack align="center" gap="md">
        {children}
        <Button
          onClick={onToggleScores}
          color={buttonColor}
          style={{ borderRadius: "20px" }}
          leftSection={<IconTrophy size={16} />}
        >
          {showScores ? hideScoresLabel : showScoresLabel}
        </Button>
      </Stack>
    </Alert>
  </Center>
);

export const CombinationStatusBlock = ({ secretStatus, showScores, onToggleScores }: CombinationStatusBlockProps) => {
  const { t } = useTranslation();

  if (secretStatus === null) {
    return null
  }

  if (secretStatus.found === false) {
    return (
      <StatusAlert
        title={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
          <IconSearch size={24} />
          {t('secret_combination_not_found_title')}
        </div>
    }
        color="orange"
        borderColor="#a78bfa"
        backgroundColor="#1a1a2e"
        buttonColor="violet"
        showScores={showScores}
        onToggleScores={onToggleScores}
        hideScoresLabel={t('hide_scores')}
        showScoresLabel={t('show_scores')}
      >
        <Text style={{ fontSize: "16px" }}>
          {t('secret_combination_not_found_msg')}
        </Text>
      </StatusAlert>
    );
  }

  return (
    <StatusAlert
      title={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
          <IconTrophy size={24} color="#2dd4bf" />
          {t('secret_combination_found_title')}
        </div>
      }
      color="teal"
      borderColor="#2dd4bf"
      backgroundColor="#1a2e2e"
      buttonColor="teal"
      showScores={showScores}
      onToggleScores={onToggleScores}
      hideScoresLabel={t('hide_scores')}
      showScoresLabel={t('show_scores')}
    >
      <Text ta="center" style={{ fontSize: "16px", color: "#2dd4bf" }}>
        {t('secret_combination_found_msg')}
      </Text>
      <Text ta="center" style={{ fontSize: "14px", opacity: 0.8 }}>
        {t('secret_combination_found_winner')}: {secretStatus.foundByNickname}
      </Text>
      <Button
        color="teal"
        style={{ borderRadius: "20px" }}
        leftSection={<IconSparkles size={16} />}
      >
        {t('secret_combination_found_result')}
      </Button>
    </StatusAlert>
  );
};
