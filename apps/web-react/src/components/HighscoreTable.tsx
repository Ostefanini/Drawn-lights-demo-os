import { type UserListHighscore } from "@drawn-lights-game/shared";
import { Center, Table } from '@mantine/core';
import { useTranslation } from "react-i18next";

interface HighscoreTableProps {
    highscore: UserListHighscore[];
}

export const HighscoreTable = ({ highscore }: HighscoreTableProps) => {
    const { t } = useTranslation();
    return (
        <Center>
            <Table w={500}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>{t('nickname')}</Table.Th>
                        <Table.Th>{t('combinations_found')}</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {highscore.sort((a, b) => b.nbCombinationsFound - a.nbCombinationsFound).map((user) => (
                        <Table.Tr key={user.nickname}>
                            <Table.Td>{user.nickname}</Table.Td>
                            <Table.Td>{user.nbCombinationsFound}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Center>
    );
};
