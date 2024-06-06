'use client';

import styled from 'styled-components';

const StyledCatLoading = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 999999999;

    .cat {
        position: relative;
        width: 100%;
        background-color: transparent;
        width: 200px;
        overflow: hidden;

        &::before {
            content: '';
            display: block;
            padding-bottom: 100%;
        }

        &:hover > * {
            animation-play-state: paused;
        }

        &:active > * {
            animation-play-state: running;
        }
    }

    .body,
    .tail,
    .head {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        animation: rotating 2.79s cubic-bezier(0.65, 0.54, 0.12, 0.93) infinite;
    }

    @keyframes rotating {
        from {
            transform: rotate(720deg);
        }

        to {
            transform: none;
        }
    }

    .body::before,
    .tail::before,
    .head::before {
        content: '';
        position: absolute;
        width: 50%;
        height: 50%;
        background-size: 200%;
        background-repeat: no-repeat;
        background-image: url('/new-cat.png');
    }

    .head::before {
        top: 0;
        right: 0;
        background-position: 100% 0;
        transform-origin: 0% 100%;
        transform: rotate(90deg);
    }

    .tail {
        animation-delay: 0.2s;
    }

    .tail::before {
        left: 0;
        bottom: 0;
        background-position: 0 100%;
        transform-origin: 100% 0;
        transform: rotate(-30deg);
    }

    .body {
        animation-delay: 0.1s;

        &:nth-of-type(2) {
            animation-delay: 0.2s;
        }

        &::before {
            right: 0;
            bottom: 0;
            background-position: 100% 100%;
            transform-origin: 0 0;
        }
    }
`;

const CatLoading = () => {
    return (
        <StyledCatLoading className="box">
            <div className="cat">
                <div className="body"></div>
                <div className="body"></div>
                <div className="tail"></div>
                <div className="head"></div>
            </div>
        </StyledCatLoading>
    );
};

export default CatLoading;
