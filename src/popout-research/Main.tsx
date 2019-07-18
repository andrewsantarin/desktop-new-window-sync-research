import React, { Fragment, useCallback, useState } from 'react';
// import { Popout } from 'react-popout-component';
import NewWindow from 'react-new-window';
// import NewWindow from 'react-new-window-research';

import { URL_PATH as DETACHABLE_URL_PATH } from './Detachable';
import { Attachable } from './Attachable';
import { ValueApiContainer } from './ValueApi';
import { ValueContainer, URL_PATH as VALUE_CONTAINER_URL_PATH } from './Value';
import { DropdownMenu } from './DropdownMenu';
import { Button } from 'antd';

export const Main = () => {
  const [ popout, setPopout ] = useState(false);
  const togglePopout = useCallback(
    () => {
      setPopout((popout) => !popout);
    },
    [ setPopout ],
  );
  const attachPopout = useCallback(
    () => {
      setPopout(false);
    },
    [ setPopout ],
  );

  return (
    <Fragment>
      <h2>Main</h2>
      <button onClick={togglePopout}>
        {`${!popout ? 'Open a' : 'Close the'} popout`}
      </button>

      {/* Let's pretend that this is hooked up to a socket... */}
      <ValueApiContainer>
        <ValueContainer />
      </ValueApiContainer>

      {/* And this isn't... */}
      {popout && (
        <NewWindow url={`${DETACHABLE_URL_PATH}${VALUE_CONTAINER_URL_PATH}`}>
          <Attachable onAttachClick={attachPopout} />
        </NewWindow>
      )}

      {popout && (
        <NewWindow>
          <div>
            <p>This window has no JavaScript in it.</p>
            <p>
              Content is generated with the help of
              {' '}
              <strong><code>React.createPortal()</code></strong>
              {' '}
              and
              {' '}
              <strong><code>window.open()</code></strong>
              {' '}
              running in the main window.
            </p>
            <p>
              The reason this doesn't work correctly is perhaps because the
              {' '}
              <strong><code>window</code></strong>
              {' '}
              global object refers to the main tab, not this child.
            </p>
          </div> 
          <DropdownMenu
            menuTemplate={{
              childrenTemplate: [
                {
                  content: 'Item 1',
                  icon: 'user',
                  iconPosition: 'left',
                },
                {
                  content: 'Item 2',
                  icon: 'user',
                  iconPosition: 'left',
                },
                {
                  content: 'Item 3',
                  icon: 'user',
                  iconPosition: 'left',
                },
                {
                  submenu: 'submenu',
                  content: 'Submenu 4',
                  icon: 'user',
                  iconPosition: 'left',
                  childrenTemplate: [
                    {
                      content: 'Item 4.1',
                      icon: 'user',
                      iconPosition: 'left',
                    },
                  ]
                }
              ]
            }}
            icon="user"
            content="This menu renders on the wrong side."
            contentWrapper={Button}
          />
        </NewWindow>
      )}
    </Fragment>
  );
}
