import githubInjection from 'github-injection';
import selectDom from 'select-dom';

import React from 'dom-chef';
import { css } from '@emotion/css';

// Similar to the gitpod-io/browser-extension implementation

const BUTTON_ID = 'OPEN_IN_VSCODE_BUTTON';

// interface InjectOptions {
//     parentSelector: string;
//     create: (container: HTMLDivElement, anchor: HTMLAnchorElement) => void;
// }

const getButtonUrl = () => {
    // we're on the support page (e.g. have file-navigator) so we're in the repo
    const [, owner, repo] = location.href;
    return `vscode-github-manager://open-github/${owner}/${repo}`;
};

githubInjection(() => {
    const openButton = selectDom(`a#${BUTTON_ID}`)
    if (openButton) {
        openButton.href = getButtonUrl();
    } else {
        // do not inject to empty repository for now
        // if (selectDom.exists('#empty-setup-clone-url')) {
        //     const repoContent = selectDom('.repository-content');
        //     const indexOfHelp = Array.from(repoContent.children).findIndex(el => el.tagName === "GIT-CLONE-HELP");
        //     console.log(indexOfHelp);
        //     // injectButton({
        //     //     parentSelector: '.repository-content',
        //     // });
        // }

        const fileNavigation = selectDom('.file-navigation');
        if (fileNavigation) {
            const buttonClass = css`
                --color-btn-active-bg: rgb(0, 187, 255);
                --color-btn-hover-bg: rgb(0, 153, 255);
                background: rgb(0, 132, 220);
                color: white;
            `;
            fileNavigation.append(
                <a className={`btn ml-2 ${buttonClass}`} id={BUTTON_ID} href={getButtonUrl()}>Open in VSCode</a>,
            );
        }
    }
});
