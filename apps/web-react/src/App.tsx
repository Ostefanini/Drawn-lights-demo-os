import {
    Button,
    Center,
    Group,
    Radio,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import '@mantine/core/styles.css';
import {
    IconDatabase,
} from "@tabler/icons-react";
import {
    type Asset, type CombinationStatus,
    demoPlaystationModels, type Sound,
    type UserListHighscore
} from "@drawn-lights-demo/shared";
import { emojiBlasts } from "emoji-blast";
import { serialize } from 'object-to-formdata';
import { useEffect, useState } from "react";
import GithubCorner from 'react-github-corner';
import { useTranslation } from "react-i18next";

import { AssetCard } from "./components/AssetCard.js";
import { ComputeMenu } from "./components/ComputeMenu.js";
import { HighscoreTable } from "./components/HighscoreTable.js";
import { ResultSection } from "./components/ResultSection.js";
import { TechnologiesSection } from "./components/TechnologiesSection.js";
import { WaveSurferPlayer } from "./components/WaveSurferPlayer.js";
import { computeAssetQueryParams } from "./helpers.js";
import showsConst from "./playstation_shows.json";
import api from "./services/api.js";


function App() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [assets, setAssets] = useState<Asset[]>([]);
  const [playlist, setPlaylist] = useState<Asset[]>([]);
  const [showVideo, setShowVideo] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [isNew, setIsNew] = useState<boolean | null>(null);
  const [sound, setSound] = useState<Sound>("none");
  const [foundBy, setFoundBy] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [highscore, setHighscore] = useState<UserListHighscore[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [{ data: assetsData }, { data: usersData }] = await Promise.all([
        api.get<Asset[]>("/assets"),
        api.get<UserListHighscore[]>("/users")
      ]);

      if (!cancelled) {
        setAssets(assetsData);
        setUsers(usersData.map(({ nickname }) => nickname));
        setHighscore(usersData);
        setLoading(false);
      }
    })().catch((e) => {
      if (!cancelled) {
        setLoading(false);
        console.error("Failed to load data", e);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (isNew === null) return;
    const emojis = isNew ? "✅🎉🚀" : "❌😢";
    const { cancel } = emojiBlasts({
      interval: 150,
      emojis: [emojis],
    });
    setTimeout(cancel, 600);
  }, [isNew])


  if (loading) return <div>{t('loading')}</div>;

  return (
    <>
      <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: 10, zIndex: 1000 }}>
        <div
          onClick={() => void i18n.changeLanguage('fr')}
          style={{
            cursor: 'pointer',
            fontSize: '24px',
            border: i18n.language === 'fr' ? '2px solid white' : '2px solid transparent',
            borderRadius: '4px',
            padding: '2px',
            lineHeight: '1'
          }}
        >
          🇫🇷
        </div>
        <div
          onClick={() => void i18n.changeLanguage('en')}
          style={{
            cursor: 'pointer',
            fontSize: '24px',
            border: i18n.language === 'en' ? '2px solid white' : '2px solid transparent',
            borderRadius: '4px',
            padding: '2px',
            lineHeight: '1'
          }}
        >
          🇬🇧
        </div>
      </div>
      <GithubCorner
        href="https://github.com/Ostefanini/drawn-lights-demo"
      />
      <div
        style={{ marginTop: "60px" }}
      >
        <Title ta='center' order={1}>{t('title')}</Title>
        <Title ta="center" order={3}>{t('subtitle')}</Title>

        <TechnologiesSection />

        <Text fs="italic" ta="center">{t('try_discovering')}</Text>
        <Center style={{ marginTop: "8px" }}><Button onClick={() => setShowScore((prev) => !prev)}>{showScore ? t('hide_scores') : t('show_scores')}</Button></Center>
        <div style={{ marginTop: "24px" }}>
          {!showScore && (
            <div>
              {assets.length === 0 && playlist.length === 0 && (
                <div>
                  <Center>{t('no_asset')}</Center>
                  <Center style={{ marginTop: "12px" }}>
                    <Button
                      onClick={() => {
                        void (async () => {
                          try {
                            await Promise.all(
                              demoPlaystationModels.map(async (model) => {
                                const filename = `${model.name}.png`;
                                const res = await fetch(`/${filename}`);
                                const imgBlob = await res.blob();

                                const sendData = {
                                  thumbnail: new File([imgBlob], filename, { type: "image/png" }),
                                  ...model,
                                };

                                const serializedData = serialize(sendData);
                                const { data } = await api.post<Asset>("/assets", serializedData);
                                setAssets((prev) => [...prev, data]);
                              })
                            );
                          } catch (e) {
                            console.error(e);
                          }
                        })();
                      }}
                    >
                      {t('populate')}
                      <IconDatabase />
                    </Button>
                  </Center>
                </div>
              )}
              {assets.length > 0 && (
                <>
                  <SimpleGrid
                    cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                    spacing="md"
                    style={{ margin: "24px" }}
                  >
                    {assets.map((asset) => (
                      <AssetCard
                        key={asset.id}
                        asset={asset}
                        onAddToPlaylist={(asset) => {
                          setPlaylist([...playlist, asset]);
                          setAssets(assets.filter(a => a.id !== asset.id));
                        }}
                      />
                    ))}
                  </SimpleGrid>
                </>
              )
              }

              <Center my="lg">
                <Radio.Group
                  value={sound || 'none'}
                  onChange={(val) => {
                    const validatedSound = ['healing', 'emerveille', 'glossy'].includes(val) ? val : null;
                    setSound(validatedSound as Sound);
                  }}
                  label={t('select_audio')}
                >
                  <Stack gap="xs" mt="xs">
                    <Radio value="none" label={t('no_sound')} />
                    {['healing', 'emerveille', 'glossy'].map((track) => (
                      <Group key={track}>
                        <Radio value={track} label={track} />
                        <WaveSurferPlayer url={`/${track}-cut.mp3`} />
                      </Group>
                    ))}
                  </Stack>
                </Radio.Group>
              </Center>

              <ComputeMenu
                playlist={playlist}
                onRemoveFromPlaylist={(asset) => {
                  setAssets([...assets, asset]);
                  setPlaylist(playlist.filter((a) => a.id !== asset.id));
                }}
                audio={sound}
                onCompute={() => {
                  void (async () => {
                    try {
                      const { data } = await api.get<CombinationStatus>(`/combinations/is-found?${computeAssetQueryParams(playlist, sound)}`);
                      if (data.exist && data.foundBy) {
                        setFoundBy(data.foundBy);
                      }
                      setIsNew(null)
                      setTimeout(() => {
                        setIsNew(!data.exist);
                      }, 100);

                      const combinationName = playlist.map(({ name }) => name).join(",");
                      const fullNameNotVr = `source_0_${combinationName}${sound !== "none" ? `_${sound}` : "-optimized"}.mp4`;
                      const linkNotVr = showsConst.find(
                        (show) => show.isVr === false && show.fullName === fullNameNotVr
                      )?.link;
                      if (linkNotVr) {
                        setShowVideo(linkNotVr);
                        setTimeout(() => {
                          const videoFrame = document.getElementById("videoFrame");
                          if (videoFrame) {
                            videoFrame.scrollIntoView({ behavior: "smooth" });
                          }
                        }, 100);
                      }
                    } catch (e) {
                      console.error("Failed to compute show", e);
                    }
                  })();
                }}
              />
              {showVideo && (
                <ResultSection
                  showVideo={showVideo}
                  foundBy={foundBy}
                  setFoundBy={setFoundBy}
                  users={users}
                  setUsers={setUsers}
                  isNew={isNew}
                  setIsNew={setIsNew}
                  playlist={playlist}
                  sound={sound}
                  setHighscore={setHighscore}
                />
              )}
            </div>
          )}
          {showScore && (
            <HighscoreTable highscore={highscore} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;