import React from "react"
import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline"

function HomePage() {
    // const mensagem = "Bem-Vindo ao AluraTube!"
    const estiloDaHomePage = { backgroundColor: "red" }
    const [valorDoFiltro, setvalorDoFiltro] = React.useState("")

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setvalorDoFiltro={setvalorDoFiltro} />
                <Header></Header>
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}></Timeline>
            </div>
        </>

    )
}

export default HomePage


const StyledHeader = styled.div`
    img {
        height: 80px;
        width: 80px;
        border-radius: 50%;
    }

    .user-info{
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
  `;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({bg})=>bg});
   // background-image: url(${config.bg});
    height: 230px;
  `;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>

                    <h1>{config.name}</h1>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
}
function Timeline({ searchValue, ...props }) {
    //console.log("Dentro do Timeline", props.playlists);
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {
                playlistNames.map(function (playlistName) {
                    const video = props.playlists[playlistName];
                    //console.log(playlistName);
                    //console.log(video);
                    return (
                        <section key={playlistName}>
                            <h2>{playlistName}</h2>
                            <div>
                                {
                                    video.filter((video) => {
                                        const videoTitleNormalized = video.title.toLowerCase()
                                        const searchValueNormalized = searchValue.toLowerCase()
                                        return videoTitleNormalized.includes(searchValueNormalized)
                                    }).map((video) => {
                                        return <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    })
                                }
                            </div>
                        </section>
                    )
                        ;
                })
            }
        </StyledTimeline>
    )
}