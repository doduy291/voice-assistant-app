import React, { useEffect, useState } from 'react';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards.js';

const alanKey = '57a22f58de6c18406cb6977e82dbd4302e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
        } else if (command === 'open') {
          console.log(number);
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div className="logoContainer">
        <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className="alanLogo" alt="logo" />
      </div>
      <NewsCards articles={newsArticles} />
    </div>
  );
};

export default App;
