import {
    type Asset, type CombinationStatus, combinationStatusSchema,
    demoPlaystationModels, type Sound,
    type UserListHighscore
} from "@drawn-lights-game/shared";
import {
    Button,
    Center,
    Group,
    Radio,
    SimpleGrid,
    Stack,
    Text,
    Title
} from '@mantine/core';
import '@mantine/core/styles.css';
import {
    IconBrandFigma,
    IconBrandGithub,
    IconBrandNotion,
    IconDatabase
} from "@tabler/icons-react";
import { emojiBlasts } from "emoji-blast";
import { serialize } from 'object-to-formdata';
import { useEffect, useRef, useState } from "react";
import {
    CircleMenu
} from "react-circular-menu";
import { useTranslation } from "react-i18next";

import { AboutModal } from "./components/AboutModal.js";
import { AssetCard } from "./components/AssetCard.js";
import { ComputeMenu } from "./components/ComputeMenu.js";
import { HighscoreTable } from "./components/HighscoreTable.js";
import { renderCircleMenuItem } from "./components/renderCircleMenuItem.js";
import { ResultSection } from "./components/ResultSection.js";
import { TeamInformations } from "./components/TeamInformations.js";
import { WaveSurferPlayer } from "./components/WaveSurferPlayer.js";
import { buildVideoProxyUrl, computeAssetQueryParams } from "./helpers.js";
import showsConst from "./playstation_shows.json";
import api from "./services/api.js";
import type { EmojisInstructions } from "./types/app.js";

const AUDIO_TRACKS = ['healing', 'emerveille', 'glossy'] as const;

function App() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isCircleMenuOpen, setIsCircleMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const [assets, setAssets] = useState<Asset[]>([]);
  const [playlist, setPlaylist] = useState<Asset[]>([]);
  const [showVideo, setShowVideo] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [emojisInstructions, setEmojisInstructions] = useState<EmojisInstructions | null>(null);
  const [sound, setSound] = useState<Sound>("none");
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [computationResult, setComputationResult] = useState<CombinationStatus | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [highscore, setHighscore] = useState<UserListHighscore[]>([]);
  const introRef = useRef<HTMLParagraphElement>(null);

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
    if (emojisInstructions === null) {
      return;
    }
    let emojis: string;
    if (emojisInstructions.isSecretCombinationFound) {
      emojis = "✅🎉🚀";
    } else if (emojisInstructions.isNew) {
      emojis = "🕵️‍♂️🔍✨";
    } else {
      emojis = "❌😢";
    }
    const { cancel } = emojiBlasts({
      interval: 150,
      emojis: [emojis],
    });
    setTimeout(cancel, 600);
  }, [emojisInstructions])

  const reset = () => {
    setShowVideo(null);
    setPlaylist([]);
    setSound("none");
    setEmojisInstructions(null);
    setComputationResult(null);

    void (async () => {
      try {
        const { data: assetsData } = await api.get<Asset[]>("/assets");
        setAssets(assetsData);
      } catch (e) {
        console.error("Failed to reload assets", e);
      }
    })();

    setTimeout(() => {
      introRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }


  const handlePopulate = async () => {
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
  };

  const handleCompute = async () => {
    try {
      const { data } = await api.get<CombinationStatus>(`/combinations/is-found?${computeAssetQueryParams(playlist, sound)}`);
      const combinationStatus = combinationStatusSchema.parse(data);
      setComputationResult(combinationStatus);
      setEmojisInstructions(null);
      const nextEmojis: EmojisInstructions = {
        isNew: !combinationStatus.exist,
        isSecretCombinationFound: combinationStatus.isSecretCombinationFound,
      };
      setTimeout(() => {
        setEmojisInstructions(nextEmojis);
      }, 100);
      const combinationName = playlist.map(({ name }) => name).join(",");
      const fullNameNotVr = `source_0_${combinationName}${sound !== "none" ? `_${sound}` : "-optimized"}.mp4`;
      const linkNotVr = showsConst.find(
        (show) => show.isVr === false && show.fullName === fullNameNotVr
      )?.link;
      if (linkNotVr) {
        setShowVideo(buildVideoProxyUrl(linkNotVr));
        setTimeout(() => {
          document.getElementById("videoFrame")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (e) {
      console.error("Failed to compute show", e);
    }
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <>
      <div style={{ position: 'fixed', top: 20, left: 20, display: 'flex', gap: 10, zIndex: 1000 }}>
        <div
          onClick={() => void i18n.changeLanguage('fr-FR')}
          style={{
            cursor: 'pointer',
            fontSize: '24px',
            border: i18n.language === 'fr-FR' ? '2px solid white' : '2px solid transparent',
            borderRadius: '4px',
            padding: '2px',
            lineHeight: '1'
          }}
        >
          🇫🇷
        </div>
        <div
          onClick={() => void i18n.changeLanguage('en-US')}
          style={{
            cursor: 'pointer',
            fontSize: '24px',
            border: i18n.language === 'en-US' ? '2px solid white' : '2px solid transparent',
            borderRadius: '4px',
            padding: '2px',
            lineHeight: '1'
          }}
        >
          🇬🇧
        </div>
      </div>

      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
        <CircleMenu
          startAngle={90}
          rotationAngle={120}
          itemSize={2}
          radius={5}
          rotationAngleInclusive={false}
          onMenuToggle={(isOpen) => setIsCircleMenuOpen(isOpen)}
        >
          {renderCircleMenuItem(
            0,
            <IconBrandNotion size={24} color={hoveredItem === 0 ? "white" : "black"} />,
            setHoveredItem,
            "https://cord-blue-7a0.notion.site/379ca6cfbb9280d5a5e6f5a08bc57e97"
          )}
          {renderCircleMenuItem(
            1,
            <IconBrandFigma size={24} color={hoveredItem === 1 ? "white" : "black"} />,
            setHoveredItem,
            "https://www.figma.com/design/tRJl6AUPSn3TkirgklS4V8/game.drawnlights.show?node-id=0-1&p=f&t=jgIV8WMtoLMg7T8C-0"
          )}
          {renderCircleMenuItem(
            2,
            <IconBrandGithub size={24} color={hoveredItem === 2 ? "white" : "black"} />,
            setHoveredItem,
            "https://github.com/ostefanini/drawn-lights-game"
          )}
        </CircleMenu>
      </div>

      <div
        style={{
          marginTop: "60px",
          filter: isCircleMenuOpen ? 'blur(5px)' : 'none',
          transition: 'filter 0.3s ease',
          pointerEvents: isCircleMenuOpen ? 'none' : 'auto'
        }}
      >
        <Title ta='center' order={1}>{t('title')}</Title>
        <Title ta="center" order={3}>{t('subtitle')}</Title>

        <TeamInformations setOpenAboutModal={setOpenAboutModal} />
        <AboutModal opened={openAboutModal} onClose={() => setOpenAboutModal(false)} />
            
        {/* <TechnologiesSection /> */}

        <Text ref={introRef} style={{marginTop: "16px"}} fs="italic" ta="center">{t('try_discovering')}</Text>
        <Center style={{ marginTop: "8px" }}><Button onClick={() => setShowScore((prev) => !prev)}>{showScore ? t('hide_scores') : t('show_scores')}</Button></Center>
        <div style={{ marginTop: "24px" }}>
          {!showScore && (
            <div>
              {assets.length === 0 && playlist.length === 0 && (
                <div>
                  <Center>{t('no_asset')}</Center>
                  <Center style={{ marginTop: "12px" }}>
                    <Button
                      onClick={() => void handlePopulate()}
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
                        disabled={computationResult !== null}
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
                    const validatedSound = AUDIO_TRACKS.includes(val as typeof AUDIO_TRACKS[number]) ? val : null;
                    setSound(validatedSound as Sound);
                  }}
                  label={t('select_audio')}
                  style={{ pointerEvents: computationResult !== null ? 'none' : undefined, opacity: computationResult !== null ? 0.5 : undefined }}
                >
                  <Stack gap="xs" mt="xs">
                    <Radio value="none" label={t('no_sound')} />
                    {AUDIO_TRACKS.map((track) => (
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
                disabled={computationResult !== null}
                onRemoveFromPlaylist={(asset) => {
                  setAssets([...assets, asset]);
                  setPlaylist(playlist.filter((a) => a.id !== asset.id));
                }}
                audio={sound}
                onCompute={() => void handleCompute()}
              />
              {showVideo && (
                <ResultSection
                  key={computationResult?.foundBy ?? 'new'}
                  showVideo={showVideo}
                  computationResult={computationResult} 
                  reset={reset}
                  users={users}
                  setUsers={setUsers}
                  setEmojisInstructions={setEmojisInstructions}
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