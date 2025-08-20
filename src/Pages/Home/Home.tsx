import React, { useState } from 'react';
import './Home.css';
import { FaSearch } from 'react-icons/fa';
import NavBar from '../../components/NavBar';

const Home: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const buttons: string[] = ['캐릭터 챗', '웹 소설', '유저 노트'];

    const handleClick = (index: number): void => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    let content: React.ReactNode;
    switch (activeIndex) {
        case 0:
            content = (
                <>
                    <section className="section recommend-character-chat"></section>
                    <section className="section public-favorite-choice"></section>
                    <section className="section otherGenre"></section>
                    <section className="section All-chat"></section>
                </>
            );
            break;
        case 1:
            content = (
                <>
                    <section className="section recommend-web-novel"></section>
                    <section className="section public-favorite-novel"></section>
                    <section className="section recommend-taste"></section>
                    <section className="section All-web-novel"></section>
                </>
            );
            break;
        case 2:
            content = (
                <>
                    <section className="section recommend-userNote"></section>
                    <section className="section genre-popular-note"></section>
                    <section className="section genre-romance"></section>
                    <section className="section all-user-note"></section>
                </>
            );
            break;
        default:
            content = (
                <div>
                    <section className="section chip-carousel"></section>
                    <section className="section user-favorite"></section>
                    <section className="section well-read-novel"></section>
                    <section className="section user-favorite-chat"></section>
                    <section className="section new-userNote"></section>
                </div>
            );
    }

    return (
        <div className="Home-container">
            <div className="scroll-area">
                <section className="section title">
                    <div className="appTitle">WHIF</div>
                    <FaSearch className="searchIcon" />
                </section>

                <section className="section chip">
                    <div className="chip-button">
                        {buttons.map((label, index) => (
                            <button
                                key={index}
                                type="button"
                                className={activeIndex === index ? 'active' : ''}
                                onClick={() => handleClick(index)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </section>

                {content}
            </div>
            <NavBar />
        </div>
    );
};

export default Home;