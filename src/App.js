import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
const alanKey =
  '57a22f58de6c18406cb6977e82dbd4302e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === 'newHeadlines') {
          console.log(articles);
        }
      },
    });
  }, []);
  return (
    <div>
      <h1>ALAN AI News App</h1>
    </div>
  );
};

export default App;
