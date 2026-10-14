
(function () {
  "use strict";

  // 使用自動產生的注音資料
  const dictionary = window.zhuyinDictionary || {};

  function addZhuyin(root) {
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT
    );

    const nodes = [];
    let node;

    while ((node = walker.nextNode())) {
      if (!node.nodeValue.trim()) continue;

      const parent = node.parentElement;
      if (!parent) continue;

      // 避免重複加注音，也不處理程式碼
      if (parent.closest(
        "script, style, ruby, rt, textarea, code, pre, svg"
      )) continue;

      nodes.push(node);
    }

    nodes.forEach(textNode => {
      const fragment = document.createDocumentFragment();

      for (const char of textNode.nodeValue) {
        if (dictionary[char]) {
          const ruby = document.createElement("ruby");
          const rt = document.createElement("rt");

          ruby.textContent = char;
         
          
const reading = dictionary[char];

const toneMatch = reading.match(/[ˊˇˋ˙]/);
const tone = toneMatch ? toneMatch[0] : "";
const symbols = reading.replace(/[ˊˇˋ˙]/g, "");

const symbolsSpan = document.createElement("span");
symbolsSpan.className = "zhuyin-symbols";
symbolsSpan.textContent = symbols;

const toneSpan = document.createElement("span");
toneSpan.className = "zhuyin-tone";

if (tone === "˙") {
    toneSpan.classList.add("tone-light");
} else {
    toneSpan.classList.add("tone-normal");
}

toneSpan.textContent = tone;

rt.appendChild(symbolsSpan);
rt.appendChild(toneSpan);


          ruby.appendChild(rt);
          fragment.appendChild(ruby);
        } else {
          fragment.appendChild(
            document.createTextNode(char)
          );
        }
      }

      textNode.replaceWith(fragment);
    });
  }

  
document.addEventListener("DOMContentLoaded", () => {
    // 網頁一開始的文字
    addZhuyin(document.body);

    // 遊戲進行時，新出現的題目與選項
    const observer = new MutationObserver((mutations) => {
        observer.disconnect();

        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    addZhuyin(node);
                } else if (
                    node.nodeType === Node.TEXT_NODE &&
                    node.parentElement
                ) {
                    addZhuyin(node.parentElement);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});


})();
