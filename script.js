const TAG_CATEGORY_DEFINITIONS = [
  {
    id: "genre",
    title: "ジャンル",
    description: "作品の大きな種類で選ぶ",
    labels: ["本格", "本格ミステリ", "社会派", "警察ミステリ", "法廷ミステリ", "青春ミステリ", "日常の謎", "海外ミステリ", "歴史ミステリ", "理系ミステリ", "SFミステリ", "ホラー", "ユーモアミステリ", "ハードボイルド", "短編集"]
  },
  {
    id: "situation",
    title: "舞台・状況",
    description: "事件の形や舞台設定で選ぶ",
    labels: ["クローズドサークル", "館もの", "密室", "不可能犯罪", "特殊設定", "極限状況", "ゲーム", "法廷", "学園", "音楽ミステリ", "孤島", "雪山"]
  },
  {
    id: "taste",
    title: "読み味",
    description: "読みやすさ・重さ・雰囲気で選ぶ",
    labels: ["読みやすい", "入門向け", "読み応え", "重厚", "ライト", "クセ強め", "上級者向け", "短め", "不穏", "後味悪い", "人間ドラマ", "ユーモア", "スピード感", "現代的", "旅情", "好み外良作"]
  },
  {
    id: "intellect",
    title: "知的要素",
    description: "論理・探偵・頭脳戦寄りで選ぶ。危険な核心タグは内部だけで処理します。",
    labels: ["知略・頭脳戦", "論理戦", "名探偵", "天才", "冷静", "冷徹", "心理戦", "王道", "観察力", "知的キャラ", "ホームズ", "好み特化"]
  },
  {
    id: "value",
    title: "評価・位置づけ",
    description: "ミステリ好き向けの優先度で選ぶ",
    labels: ["名作・必読", "超人気作", "人気作", "近年人気", "最近人気上昇", "親しまれている", "チャッピーおすすめ", "古典", "海外古典"]
  }
];

const SPOILER_SENSITIVE_LABELS = [
  "大どんでん返し", "どんでん返し", "叙述", "叙述ミステリ", "倒叙", "倒叙ミステリ",
  "仕掛け重視", "黒幕", "犯人視点", "読後反転", "構成の罠", "構造トリック",
  "真相反転", "信用できない語り手", "読者騙し", "メタミステリ", "ネタバレ危険", "トリック核心"
];

const INTERNAL_DETAIL_LABELS = [
  "盤面支配", "高計画性", "先読み", "支配構造", "犯人計画型", "犯人側が強い",
  "探偵側が強い", "天才型", "合理主義", "感情排除", "倫理観薄め", "仮説検証",
  "論理パズル型", "多重推理", "推理合戦", "不可能犯罪解体", "心理誘導",
  "ゲーム理論", "特殊ルール推理", "閉鎖空間の知略", "証言整理", "アリバイ崩し",
  "構造理解", "情報整理", "ミスリード設計", "読者への挑戦", "必読級", "名作枠",
  "高品質", "一般人気", "本格賞評価", "ランキング評価", "好み一致度高", "好み一致度中",
  "低優先", "古典教養枠", "シリーズ重要作", "現代本格重要作", "知的快感", "ロジック重視",
  "技巧派", "奇想派", "好み外良作"
];

const RATING_OPTIONS = [
  { value: "loved", label: "刺さった", point: 3, description: "かなり好みに合った。次も似た要素を強く増やす" },
  { value: "liked", label: "面白かった", point: 2, description: "普通に好みに合った。似た要素を増やす" },
  { value: "normal", label: "普通", point: 0, description: "強くは学習しない。理由があれば少しだけ反映" },
  { value: "disliked", label: "合わなかった", point: -2, description: "似た要素を少し減らす" },
  { value: "dropped", label: "途中でやめた", point: -3, description: "似た要素を強く減らす" }
];

const RATING_VALUES = RATING_OPTIONS.reduce(function (values, option) {
  values[option.value] = option.point;
  return values;
}, {});

const RATING_LABELS = RATING_OPTIONS.reduce(function (labels, option) {
  labels[option.value] = option.label;
  return labels;
}, {});

const RATING_REASON_SECTIONS = [
  {
    field: "likedReasons",
    className: "liked-reason-checkbox",
    title: "良かった理由",
    description: "選ぶほど、似た要素を持つ本が自分専用おすすめで出やすくなります。",
    categories: [
      {
        title: "論理・推理",
        reasons: [
          { value: "logicStrong", label: "ロジックが強い" },
          { value: "deductionSatisfying", label: "推理の納得感がある" },
          { value: "clueRecovery", label: "伏線回収がうまい" },
          { value: "infoOrganizing", label: "情報整理が気持ちいい" },
          { value: "solvingProcess", label: "謎解きの過程が面白い" },
          { value: "fairChallenge", label: "読者への挑戦感がある" }
        ]
      },
      {
        title: "仕掛け・構成",
        reasons: [
          { value: "structureCraft", label: "構成が巧い" },
          { value: "endingReversal", label: "終盤の反転が刺さった" },
          { value: "misdirectionCraft", label: "ミスリードがうまい" },
          { value: "truthRevealCraft", label: "真相の見せ方がうまい" },
          { value: "rereadable", label: "読み返したくなる" }
        ]
      },
      {
        title: "頭脳戦・支配",
        reasons: [
          { value: "boardControl", label: "盤面支配がある" },
          { value: "mastermindStrong", label: "犯人側・黒幕側が強い" },
          { value: "highPlanning", label: "計画性が高い" },
          { value: "foresight", label: "先読みがある" },
          { value: "psychologicalBattle", label: "心理戦が良い" },
          { value: "confrontation", label: "対決感がある" }
        ]
      },
      {
        title: "キャラ",
        reasons: [
          { value: "detectiveCool", label: "探偵がかっこいい" },
          { value: "geniusAura", label: "天才感がある" },
          { value: "coldRational", label: "冷静・冷徹な人物がいる" },
          { value: "villainCharming", label: "犯人・黒幕に魅力がある" },
          { value: "dialogueGood", label: "キャラ同士の会話が良い" }
        ]
      },
      {
        title: "読み味",
        reasons: [
          { value: "readable", label: "読みやすい" },
          { value: "fastPaced", label: "テンポが良い" },
          { value: "atmosphereGood", label: "雰囲気が良い" },
          { value: "tension", label: "緊張感がある" },
          { value: "immersive", label: "没入感がある" },
          { value: "satisfyingAftertaste", label: "後味が良い" }
        ]
      },
      {
        title: "設定・ジャンル",
        reasons: [
          { value: "closedCircleGood", label: "クローズドサークルが良い" },
          { value: "specialSettingGood", label: "特殊設定が良い" },
          { value: "authenticMysteryGood", label: "本格ミステリ感が良い" },
          { value: "scienceIntellectGood", label: "理系・知的要素が良い" },
          { value: "gameRulesGood", label: "ゲーム性がある" }
        ]
      }
    ]
  },
  {
    field: "dislikedReasons",
    className: "disliked-reason-checkbox",
    title: "微妙だった方向性",
    description: "作品の出来ではなく、苦手なジャンル・読み味・方向性だけを学習します。",
    categories: [
      {
        title: "ジャンルが合わない",
        reasons: [
          { value: "sfMismatch", label: "SF要素が合わない" },
          { value: "horrorMismatch", label: "ホラー要素が合わない" },
          { value: "socialMismatch", label: "社会派が合わない" },
          { value: "iyamisuMismatch", label: "イヤミスが合わない" },
          { value: "youthMismatch", label: "青春要素が合わない" },
          { value: "romanceMismatch", label: "恋愛要素が合わない" },
          { value: "dailyMysteryMismatch", label: "日常の謎が合わない" },
          { value: "policeMismatch", label: "警察ミステリが合わない" },
          { value: "historyMismatch", label: "歴史ミステリが合わない" },
          { value: "legalMismatch", label: "法廷ミステリが合わない" },
          { value: "overseasMismatch", label: "海外ミステリが合わない" }
        ]
      },
      {
        title: "読み味が合わない",
        reasons: [
          { value: "heavyMismatch", label: "重すぎる方向が合わない" },
          { value: "darkMismatch", label: "暗すぎる方向が合わない" },
          { value: "scaryMismatch", label: "怖すぎる方向が合わない" },
          { value: "lightMismatch", label: "軽すぎる方向が合わない" },
          { value: "longMismatch", label: "長編・重厚すぎる方向が合わない" },
          { value: "classicMismatch", label: "古典寄りが合わない" },
          { value: "quirkyMismatch", label: "クセ強めが合わない" }
        ]
      }
    ]
  }
];

const REASON_LABEL_MAP = {
  logicStrong: ["ロジック重視", "論理パズル型", "仮説検証", "知的快感", "論理戦"],
  deductionSatisfying: ["仮説検証", "情報整理", "構造理解", "知的快感", "本格ミステリ"],
  clueRecovery: ["構造理解", "情報整理", "ミスリード設計", "読者への挑戦", "仕掛け重視"],
  infoOrganizing: ["情報整理", "証言整理", "仮説検証", "閉鎖空間の知略"],
  solvingProcess: ["仮説検証", "論理パズル型", "多重推理", "推理合戦"],
  fairChallenge: ["読者への挑戦", "本格", "本格ミステリ", "論理パズル型"],
  structureCraft: ["仕掛け重視", "構造理解", "技巧派", "構成の罠"],
  endingReversal: ["仕掛け重視", "読後反転", "真相反転", "ミスリード設計"],
  misdirectionCraft: ["ミスリード設計", "心理誘導", "読者騙し", "仕掛け重視"],
  truthRevealCraft: ["真相反転", "構造理解", "情報整理", "高品質"],
  rereadable: ["技巧派", "高品質", "構造理解", "名作枠"],
  boardControl: ["盤面支配", "支配構造", "閉鎖空間の知略", "頭脳戦"],
  mastermindStrong: ["犯人側が強い", "黒幕", "犯人計画型", "支配構造"],
  highPlanning: ["高計画性", "犯人計画型", "先読み", "支配構造"],
  foresight: ["先読み", "高計画性", "合理主義", "頭脳戦"],
  psychologicalBattle: ["心理戦", "心理誘導", "対決型", "頭脳戦"],
  confrontation: ["対決型", "推理合戦", "犯人側が強い", "探偵側が強い"],
  detectiveCool: ["探偵がかっこいい", "探偵側が強い", "知的キャラ", "名探偵"],
  geniusAura: ["天才", "天才型", "合理主義", "知的キャラ"],
  coldRational: ["冷静", "冷徹", "冷静な探偵", "合理主義", "感情排除"],
  villainCharming: ["犯人側が強い", "黒幕", "知的キャラ", "犯人計画型"],
  dialogueGood: ["会話劇", "知的キャラ", "読みやすい", "ユーモア"],
  readable: ["読みやすい", "入門向け", "ライト"],
  fastPaced: ["スピード感", "読みやすい", "サスペンス"],
  atmosphereGood: ["雰囲気", "不穏", "旅情", "現代的"],
  tension: ["緊張感", "不穏", "サスペンス", "極限状況"],
  immersive: ["没入感", "読み応え", "重厚", "高品質"],
  satisfyingAftertaste: ["後味が良い", "人間ドラマ", "高品質"],
  closedCircleGood: ["クローズドサークル", "閉鎖空間の知略", "極限状況"],
  specialSettingGood: ["特殊設定", "特殊ルール推理", "奇想派"],
  authenticMysteryGood: ["本格", "本格ミステリ", "王道", "読者への挑戦"],
  scienceIntellectGood: ["理系", "理系ミステリ", "知的快感", "合理主義"],
  gameRulesGood: ["ゲーム", "ゲーム理論", "特殊ルール推理", "対決型"],
  sfMismatch: ["SFミステリ", "SF", "特殊設定"],
  horrorMismatch: ["ホラー", "怖い", "不穏"],
  socialMismatch: ["社会派", "人間ドラマ", "重厚"],
  iyamisuMismatch: ["イヤミス", "後味悪い", "不穏"],
  youthMismatch: ["青春ミステリ", "青春", "学園"],
  romanceMismatch: ["恋愛ミステリ", "恋愛"],
  dailyMysteryMismatch: ["日常の謎", "ライト"],
  policeMismatch: ["警察ミステリ", "警察"],
  historyMismatch: ["歴史ミステリ", "歴史"],
  legalMismatch: ["法廷ミステリ", "法廷"],
  overseasMismatch: ["海外ミステリ", "海外古典"],
  heavyMismatch: ["重厚", "読み応え", "上級者向け"],
  darkMismatch: ["暗い", "不穏", "後味悪い"],
  scaryMismatch: ["ホラー", "怖い", "不穏"],
  lightMismatch: ["ライト", "入門向け", "日常の謎"],
  longMismatch: ["長編", "重厚", "読み応え"],
  classicMismatch: ["古典", "海外古典", "古典教養枠"],
  quirkyMismatch: ["クセ強め", "奇想派", "上級者向け"]
};

const PRESET_CONFIGS = {
  safeStart: {
    gachaType: "all",
    filters: ["読みやすい", "入門向け", "人気作"],
    excludes: ["重厚", "上級者向け", "クセ強め", "後味悪い", "不穏"]
  },
  logicBattle: {
    gachaType: "logic",
    filters: ["知略・頭脳戦", "論理戦", "名探偵"],
    excludes: []
  },
  honkaku: {
    gachaType: "masterpiece",
    filters: ["本格", "本格ミステリ", "王道"],
    excludes: []
  },
  easyRead: {
    gachaType: "all",
    filters: ["読みやすい", "入門向け", "ライト"],
    excludes: ["重厚", "上級者向け", "読み応え"]
  },
  heavyMasterpiece: {
    gachaType: "masterpiece",
    filters: ["名作・必読", "重厚", "読み応え"],
    excludes: ["ライト"]
  },
  spoilerSafe: {
    displayMode: "spoilerSafe",
    gachaType: "all",
    filters: ["読みやすい", "入門向け"],
    excludes: ["クセ強め", "後味悪い", "不穏"]
  },
  clear: {
    gachaType: "all",
    filters: [],
    excludes: []
  }
};


let selectedFilters = [];
let selectedExcludeFilters = [];
let displayMode = "spoilerSafe";
let gachaType = "all";
let currentResultBooks = [];
let readBookIds = loadIdList("mysteryGachaReadBookIds");
let wantBookIds = loadIdList("mysteryGachaWantBookIds");
let shownStats = loadShownStats("mysteryGachaShownStats");
let bookRatings = loadBookRatings("mysteryGachaBookRatings");

const selectedGenreElement = document.getElementById("selectedGenre");
const gachaButton = document.getElementById("gachaButton");
let genreButtons = [];
let excludeTagButtons = [];
const filterButtonsArea = document.getElementById("filterButtons");
const excludeButtonsArea = document.getElementById("excludeButtons");
const modeInputs = document.querySelectorAll('input[name="displayMode"]');
const modeOptions = document.querySelectorAll(".mode-option");
const gachaTypeInputs = document.querySelectorAll('input[name="gachaType"]');
const gachaTypeOptions = document.querySelectorAll(".gacha-type-option");
const resultList = document.getElementById("resultList");
const resultMessage = document.getElementById("resultMessage");
const selectedArea = document.getElementById("selectedArea");
const selectedTitle = document.getElementById("selectedTitle");
const selectedText = document.getElementById("selectedText");
const excludeReadBooksCheckbox = document.getElementById("excludeReadBooks");
const excludeStatus = document.getElementById("excludeStatus");
const detailArea = document.getElementById("detailArea");
const detailContent = document.getElementById("detailContent");
const closeDetailButton = document.getElementById("closeDetailButton");
const wantCount = document.getElementById("wantCount");
const readCount = document.getElementById("readCount");
const favoriteLabels = document.getElementById("favoriteLabels");
const wantList = document.getElementById("wantList");
const readList = document.getElementById("readList");
const clearStorageButton = document.getElementById("clearStorageButton");
const resultCountSelect = document.getElementById("resultCountSelect");
const bookSearchInput = document.getElementById("bookSearchInput");
const bookSearchButton = document.getElementById("bookSearchButton");
const clearSearchButton = document.getElementById("clearSearchButton");
const searchMessage = document.getElementById("searchMessage");
const searchResultList = document.getElementById("searchResultList");
const exportDataButton = document.getElementById("exportDataButton");
const importDataButton = document.getElementById("importDataButton");
const importDataInput = document.getElementById("importDataInput");
const dataStatus = document.getElementById("dataStatus");
const presetButtons = document.querySelectorAll(".preset-button");

initializeApp();

function initializeApp() {
  renderFilterButtons();
  bindFilterButtons();
  renderExcludeButtons();
  bindExcludeButtons();
  bindPresetButtons();

  modeInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      displayMode = input.value;
      updateModeButtons();

      if (currentResultBooks.length > 0) {
        displayBooks(currentResultBooks);
        updateResultMessage(currentResultBooks.length, getCurrentCandidateCount());
        selectedArea.classList.add("hidden");
      }
    });
  });

  gachaTypeInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      gachaType = input.value;
      updateGachaTypeButtons();
      selectedArea.classList.add("hidden");
    });
  });

  gachaButton.addEventListener("click", runGacha);

  excludeReadBooksCheckbox.addEventListener("change", function () {
    refreshCurrentResults();
    selectedArea.classList.add("hidden");
  });

  closeDetailButton.addEventListener("click", function () {
    detailArea.classList.add("hidden");
  });

  clearStorageButton.addEventListener("click", function () {
    const confirmed = window.confirm("読みたい本・既読本・読後評価の保存データをすべて削除しますか？");

    if (!confirmed) {
      return;
    }

    readBookIds = [];
    wantBookIds = [];
    shownStats = {};
    bookRatings = {};
    saveIdList("mysteryGachaReadBookIds", readBookIds);
    saveIdList("mysteryGachaWantBookIds", wantBookIds);
    saveShownStats("mysteryGachaShownStats", shownStats);
    saveBookRatings("mysteryGachaBookRatings", bookRatings);
    selectedArea.classList.add("hidden");
    detailArea.classList.add("hidden");
    refreshCurrentResults();
    updateMypage();
  });

  if (resultCountSelect) {
    resultCountSelect.addEventListener("change", function () {
      selectedArea.classList.add("hidden");
      if (currentResultBooks.length > 0) {
        runGacha();
      }
    });
  }

  if (bookSearchButton) {
    bookSearchButton.addEventListener("click", runBookSearch);
  }

  if (bookSearchInput) {
    bookSearchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        runBookSearch();
      }
    });
  }

  if (clearSearchButton) {
    clearSearchButton.addEventListener("click", function () {
      bookSearchInput.value = "";
      searchResultList.innerHTML = "";
      searchMessage.textContent = "タイトル・作者・出版社で検索できます。";
    });
  }

  if (exportDataButton) {
    exportDataButton.addEventListener("click", exportUserData);
  }

  if (importDataButton) {
    importDataButton.addEventListener("click", function () {
      importDataInput.click();
    });
  }

  if (importDataInput) {
    importDataInput.addEventListener("change", importUserData);
  }

  updateFilterButtons();
  updateExcludeButtons();
  updateModeButtons();
  updateGachaTypeButtons();
  updateMypage();
}

function bindPresetButtons() {
  presetButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyPreset(button.dataset.preset);
    });
  });
}

function applyPreset(presetName) {
  const preset = PRESET_CONFIGS[presetName];

  if (!preset) {
    return;
  }

  if (preset.displayMode) {
    displayMode = preset.displayMode;
  }

  gachaType = preset.gachaType;
  selectedFilters = getAvailablePresetLabels(genreButtons, "genre", preset.filters);
  selectedExcludeFilters = getAvailablePresetLabels(excludeTagButtons, "exclude", preset.excludes);
  excludeReadBooksCheckbox.checked = true;

  setCheckedRadioValue(modeInputs, displayMode);
  setCheckedRadioValue(gachaTypeInputs, gachaType);
  updateModeButtons();
  updateGachaTypeButtons();
  updateFilterButtons();
  updateExcludeButtons();
  selectedArea.classList.add("hidden");
  detailArea.classList.add("hidden");

  if (currentResultBooks.length > 0) {
    runGacha();
  }
}

function getAvailablePresetLabels(buttons, datasetName, labels) {
  const availableLabels = Array.from(buttons).map(function (button) {
    return button.dataset[datasetName];
  });

  return labels.filter(function (label) {
    return availableLabels.includes(label);
  });
}

function setCheckedRadioValue(inputs, value) {
  inputs.forEach(function (input) {
    input.checked = input.value === value;
  });
}

function runGacha() {
  const gachaData = getGachaData();
  const candidateBooks = applyAllExclusions(gachaData.books);

  if (candidateBooks.length === 0) {
    resultMessage.textContent = getEmptyMessage(gachaData.books.length);
    resultList.innerHTML = "";
    currentResultBooks = [];
    selectedArea.classList.add("hidden");
    return;
  }

  const resultCount = getSelectedResultCount();

  if (gachaType === "random") {
    currentResultBooks = getRandomBooks(candidateBooks, resultCount);
  } else {
    currentResultBooks = getWeightedRandomBooks(candidateBooks, resultCount, getCurrentWeightMode());
  }

  recordShownBooks(currentResultBooks);
  updateResultMessage(currentResultBooks.length, candidateBooks.length);
  selectedArea.classList.add("hidden");
  displayBooks(currentResultBooks);

  const resultsArea = document.getElementById("resultsArea") || document.querySelector(".results-area");
  if (resultsArea) {
    resultsArea.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function getGachaData() {
  if (gachaType === "want") {
    return {
      books: filterBooksBySelectedFilters(getBooksFromIds(wantBookIds)),
      sourceName: "読みたい本"
    };
  }

  if (gachaType === "recommend") {
    return {
      books: getPersonalRecommendedBooks(),
      sourceName: "自分専用おすすめ"
    };
  }

  return {
    books: filterBooksBySelectedFilters(books),
    sourceName: getGachaTypeLabel(gachaType)
  };
}

function getEmptyMessage(beforeExclusionCount) {
  if (gachaType === "want" && wantBookIds.length === 0) {
    return "読みたい本がまだ保存されていません。ガチャ結果から気になる本を「読みたい」に追加してください。";
  }

  if (gachaType === "recommend" && readBookIds.length === 0 && wantBookIds.length === 0 && Object.keys(bookRatings).length === 0) {
    return "自分専用おすすめを作るには、まず読みたい本・既読本・読後評価をいくつか保存してください。";
  }

  if (beforeExclusionCount > 0) {
    return "条件に合う本はありますが、除外条件ですべて外れています。除外タグや既読本除外を減らしてください。";
  }

  return "この条件に合う小説がまだ登録されていません。";
}

function filterBooksBySelectedFilters(bookArray) {
  if (selectedFilters.length === 0) {
    return bookArray;
  }

  return bookArray.filter(function (book) {
    const bookLabels = getBookLabels(book);

    return selectedFilters.some(function (filterName) {
      return bookLabels.includes(filterName);
    });
  });
}

function applyAllExclusions(bookArray) {
  let filteredBooks = [...bookArray];

  if (excludeReadBooksCheckbox.checked) {
    filteredBooks = filteredBooks.filter(function (book) {
      return !readBookIds.includes(book.id);
    });
  }

  if (selectedExcludeFilters.length > 0) {
    filteredBooks = filteredBooks.filter(function (book) {
      const bookLabels = getBookLabels(book);

      return !selectedExcludeFilters.some(function (filterName) {
        return bookLabels.includes(filterName);
      });
    });
  }

  return filteredBooks;
}

function getCurrentCandidateCount() {
  return applyAllExclusions(getGachaData().books).length;
}

function getPersonalRecommendedBooks() {
  const baseBooks = filterBooksBySelectedFilters(books);
  const preferenceModel = buildPreferenceModel();
  const hasProfile = Object.keys(preferenceModel.labelScores).length > 0 || preferenceModel.ratedCount > 0;

  const scoredBooks = baseBooks.map(function (book) {
    return {
      book: book,
      score: calculateRecommendationScore(book, preferenceModel, hasProfile)
    };
  });

  const positiveBooks = scoredBooks
    .filter(function (item) {
      return item.score > 0;
    })
    .sort(function (a, b) {
      return b.score - a.score;
    })
    .map(function (item) {
      const copiedBook = { ...item.book };
      copiedBook.recommendationScore = item.score;
      copiedBook.recommendationReason = createRecommendationReasonText(item.book, preferenceModel);
      return copiedBook;
    });

  if (positiveBooks.length > 0) {
    return positiveBooks;
  }

  return baseBooks;
}

function buildProfileScores() {
  return buildPreferenceModel().labelScores;
}

function buildPreferenceModel() {
  const labelScores = {};
  const scoreWeights = { quality: 0, public: 0, logic: 0, taste: 0, character: 0 };
  const likedReasonCounts = {};
  const dislikedReasonCounts = {};
  let ratedCount = 0;

  getBooksFromIds(readBookIds).forEach(function (book) {
    addLabelsToScores(labelScores, getBookDisplayLabels(book), 0.6);
    addLabelsToScores(labelScores, getInternalOnlyLabels(book), 0.35);
  });

  getBooksFromIds(wantBookIds).forEach(function (book) {
    addLabelsToScores(labelScores, getBookDisplayLabels(book), 1.2);
    addLabelsToScores(labelScores, getInternalOnlyLabels(book), 0.55);
  });

  Object.keys(bookRatings).forEach(function (bookId) {
    const ratingData = bookRatings[bookId];
    const book = getBookById(Number(bookId));

    if (!book || !ratingData || !RATING_VALUES.hasOwnProperty(ratingData.rating)) {
      return;
    }

    ratedCount += 1;
    const ratingPoint = RATING_VALUES[ratingData.rating];
    const scores = getBookScores(book);

    addLabelsToScores(labelScores, getBookDisplayLabels(book), ratingPoint * 1.45);
    addLabelsToScores(labelScores, getInternalOnlyLabels(book), ratingPoint * 1.85);

    Object.keys(scoreWeights).forEach(function (key) {
      const normalizedScore = (Number(scores[key]) || 60) - 60;
      scoreWeights[key] += normalizedScore * ratingPoint;
    });

    (ratingData.likedReasons || []).forEach(function (reason) {
      likedReasonCounts[reason] = (likedReasonCounts[reason] || 0) + 1;
      addLabelsToScores(labelScores, getLabelsForReason(reason), getReasonWeight(reason, "liked") * 1.8);
    });

    (ratingData.dislikedReasons || []).forEach(function (reason) {
      dislikedReasonCounts[reason] = (dislikedReasonCounts[reason] || 0) + 1;
      addLabelsToScores(labelScores, getLabelsForReason(reason), -getReasonWeight(reason, "disliked") * 2.1);
    });
  });

  const confidence = Math.min(ratedCount / 10, 1);

  return {
    labelScores: labelScores,
    scoreWeights: scoreWeights,
    likedReasonCounts: likedReasonCounts,
    dislikedReasonCounts: dislikedReasonCounts,
    ratedCount: ratedCount,
    confidence: confidence
  };
}

function addLabelsToScores(scores, labels, point) {
  labels.forEach(function (label) {
    scores[label] = (scores[label] || 0) + point;
  });
}

function calculateRecommendationScore(book, preferenceModel, hasProfile) {
  const labels = getBookLabels(book);
  const scores = getBookScores(book);
  const profileScores = preferenceModel.labelScores || {};
  const confidence = preferenceModel.confidence || 0;
  let score = getBaseScoreForMode(book, "recommend") / 5;

  if (hasProfile) {
    labels.forEach(function (label) {
      score += (profileScores[label] || 0) * (0.55 + confidence * 0.85);
    });
  } else {
    ["チャッピーおすすめ", "人気作", "超人気作", "読みやすい", "入門向け", "親しまれている", "論理戦", "名探偵", "知略・頭脳戦", "盤面支配", "高計画性", "先読み", "天才型", "必読級"].forEach(function (label) {
      if (labels.includes(label)) {
        score += 2;
      }
    });
  }

  score += calculateScoreProfileBonus(book, preferenceModel);
  score += calculateReasonMatchBonus(book, preferenceModel);

  score += scores.taste / 10;
  score += scores.logic / 14;
  score += scores.character / 18;

  if (wantBookIds.includes(book.id)) score += 8;
  if (readBookIds.includes(book.id)) score -= 80;

  return Math.max(1, score);
}

function calculateScoreProfileBonus(book, preferenceModel) {
  const ratedCount = preferenceModel.ratedCount || 0;

  if (ratedCount === 0) {
    return 0;
  }

  const scores = getBookScores(book);
  const weights = preferenceModel.scoreWeights || {};
  let bonus = 0;

  Object.keys(scores).forEach(function (key) {
    const weight = Number(weights[key]) || 0;
    const normalizedBookScore = (Number(scores[key]) || 60) - 60;
    bonus += (weight / Math.max(1, ratedCount)) * (normalizedBookScore / 45);
  });

  return Math.max(-12, Math.min(18, bonus * (0.5 + preferenceModel.confidence)));
}

function calculateReasonMatchBonus(book, preferenceModel) {
  const labels = getBookLabels(book);
  let bonus = 0;

  Object.keys(preferenceModel.likedReasonCounts || {}).forEach(function (reason) {
    const matched = getLabelsForReason(reason).some(function (label) {
      return labels.includes(label);
    });

    if (matched) {
      bonus += preferenceModel.likedReasonCounts[reason] * getReasonWeight(reason, "liked") * 1.15;
    }
  });

  Object.keys(preferenceModel.dislikedReasonCounts || {}).forEach(function (reason) {
    const matched = getLabelsForReason(reason).some(function (label) {
      return labels.includes(label);
    });

    if (matched) {
      bonus -= preferenceModel.dislikedReasonCounts[reason] * getReasonWeight(reason, "disliked") * 1.35;
    }
  });

  return Math.max(-22, Math.min(24, bonus * (0.55 + preferenceModel.confidence)));
}

function getLabelsForReason(reason) {
  return REASON_LABEL_MAP[reason] || [];
}

function getReasonWeight(reason, direction) {
  if (["boardControl", "mastermindStrong", "highPlanning", "logicStrong", "deductionSatisfying", "endingReversal", "gameRulesGood"].includes(reason)) {
    return direction === "liked" ? 1.35 : 1.2;
  }

  if (["sfMismatch", "horrorMismatch", "socialMismatch", "iyamisuMismatch", "heavyMismatch", "darkMismatch", "classicMismatch", "quirkyMismatch"].includes(reason)) {
    return direction === "disliked" ? 1.35 : 1.1;
  }

  return 1;
}

function createRecommendationReasonText(book, preferenceModel) {
  const labels = getBookLabels(book);
  const profileScores = preferenceModel.labelScores || {};
  const matchedLabels = Object.keys(profileScores)
    .filter(function (label) {
      return labels.includes(label) && profileScores[label] > 0 && !isUnsafeRecommendationReasonLabel(label);
    })
    .sort(function (a, b) {
      return profileScores[b] - profileScores[a];
    })
    .slice(0, 3);

  if (matchedLabels.length > 0) {
    return "好み傾向「" + matchedLabels.join(" / ") + "」に近い本です。";
  }

  if (preferenceModel.ratedCount > 0) {
    return "読後評価から推定した総合傾向に近い本です。";
  }

  return "読みたい本・既読本から推定した傾向に近い本です。";
}

function isUnsafeRecommendationReasonLabel(label) {
  return SPOILER_SENSITIVE_LABELS.includes(label);
}

function getBookLabels(book) {
  return getBookFilterLabels(book);
}

function getBookFilterLabels(book) {
  return Array.from(new Set(
    (book.genres || [])
      .concat(book.displayTags || [])
      .concat(book.internalTags || [])
      .concat(book.tags || [])
      .concat(getDerivedLabels(book))
  )).filter(function (label) {
    return label && label !== "ミステリ";
  });
}

function getBookDisplayLabels(book) {
  const hiddenLabels = getSpoilerSensitiveLabels().concat(INTERNAL_DETAIL_LABELS);
  const displayGenres = (book.genres || []).filter(function (label) {
    return label !== "ミステリ" && !hiddenLabels.includes(label);
  });
  const displayTags = Array.isArray(book.displayTags)
    ? book.displayTags
    : [];

  return Array.from(new Set(displayGenres.concat(displayTags).concat(getDerivedDisplayLabels(book)))).filter(function (label) {
    return label && label !== "ミステリ" && !hiddenLabels.includes(label);
  });
}

function getDerivedDisplayLabels(book) {
  const rawLabels = (book.genres || []).concat(book.displayTags || []).concat(book.tags || []).concat(book.internalTags || []);
  const scores = getBookScores(book);
  const derived = [];

  if (rawLabels.includes("近年人気") && (scores.quality >= 70 || scores.public >= 64 || ["S", "A", "B"].includes(book.rank))) {
    derived.push("最近人気上昇");
  }

  return derived;
}

function getDerivedLabels(book) {
  const rawLabels = (book.genres || []).concat(book.displayTags || []).concat(book.tags || []).concat(book.internalTags || []);
  const scores = getBookScores(book);
  const derived = getDerivedDisplayLabels(book);
  const has = function (label) { return rawLabels.includes(label) || derived.includes(label); };

  if (scores.quality >= 78) derived.push("高品質");
  if (scores.quality >= 86 || book.rank === "S") derived.push("名作枠");
  if (scores.quality >= 88 || book.rank === "S") derived.push("必読級");
  if (scores.public >= 76 || has("超人気作") || has("親しまれている")) derived.push("一般人気");
  if (scores.public >= 86) derived.push("超人気作");
  if (scores.logic >= 72 || has("論理戦")) derived.push("ロジック重視");
  if (scores.logic >= 82) derived.push("論理パズル型", "仮説検証");
  if (scores.logic >= 90) derived.push("知的快感");
  if (scores.taste >= 82) derived.push("好み一致度高");
  if (scores.taste >= 70 && scores.taste < 82) derived.push("好み一致度中");
  if (scores.character >= 72 || has("名探偵") || has("天才") || has("冷静") || has("冷徹")) derived.push("知的キャラ");
  if (has("名探偵")) derived.push("探偵側が強い", "探偵がかっこいい");
  if (has("クローズドサークル")) derived.push("閉鎖空間の知略");
  if (has("密室") || has("不可能犯罪")) derived.push("不可能犯罪解体");
  if (has("ゲーム")) derived.push("ゲーム理論", "特殊ルール推理");
  if (has("心理戦")) derived.push("心理誘導", "対決型");
  if (has("理系") || has("理系ミステリ")) derived.push("理系", "知的快感");
  if (has("古典") || has("海外古典")) derived.push("古典教養枠");
  if (has("重厚") || has("読み応え")) derived.push("長編");
  if (has("後味悪い")) derived.push("イヤミス");
  if (has("最近人気上昇")) derived.push("ランキング評価");

  return derived;
}

function getInternalOnlyLabels(book) {
  const displayLabels = getBookDisplayLabels(book);
  return getBookFilterLabels(book).filter(function (label) {
    return label !== "ミステリ" && !displayLabels.includes(label);
  });
}

function getSpoilerSensitiveLabels() {
  return SPOILER_SENSITIVE_LABELS;
}

function isHiddenPickerLabel(label) {
  return getSpoilerSensitiveLabels().includes(label) || INTERNAL_DETAIL_LABELS.includes(label);
}

function getAllFilterLabels() {
  const labels = [];

  books.forEach(function (book) {
    getBookLabels(book).forEach(function (label) {
      if (!isHiddenPickerLabel(label) && !labels.includes(label)) {
        labels.push(label);
      }
    });
  });

  return labels.sort(function (a, b) {
    return a.localeCompare(b, "ja");
  });
}

function getAllInternalPickerLabels() {
  const labels = [];

  books.forEach(function (book) {
    (book.internalTags || []).concat(getDerivedLabels(book)).forEach(function (label) {
      if (label && label !== "ミステリ" && isHiddenPickerLabel(label) && !labels.includes(label)) {
        labels.push(label);
      }
    });
  });

  return labels.sort(function (a, b) {
    return a.localeCompare(b, "ja");
  });
}

function renderFilterButtons() {
  filterButtonsArea.innerHTML = "";

  const allGroup = document.createElement("div");
  allGroup.classList.add("tag-category-group", "tag-category-all");
  const allButton = document.createElement("button");
  allButton.classList.add("genre-button", "active");
  allButton.dataset.genre = "すべて";
  allButton.textContent = "すべて";
  allGroup.appendChild(allButton);
  filterButtonsArea.appendChild(allGroup);

  renderTagCategoryGroups(filterButtonsArea, "genre-button", "genre");
  genreButtons = document.querySelectorAll(".genre-button");
}

function renderExcludeButtons() {
  excludeButtonsArea.innerHTML = "";
  renderTagCategoryGroups(excludeButtonsArea, "exclude-tag-button", "exclude");
  excludeTagButtons = document.querySelectorAll(".exclude-tag-button");
}

function renderTagCategoryGroups(container, buttonClass, datasetName) {
  const availableLabels = getAllFilterLabels();
  const usedLabels = [];

  TAG_CATEGORY_DEFINITIONS.forEach(function (category) {
    const categoryLabels = category.labels.filter(function (label) {
      return availableLabels.includes(label);
    });

    if (categoryLabels.length === 0) {
      return;
    }

    categoryLabels.forEach(function (label) {
      if (!usedLabels.includes(label)) {
        usedLabels.push(label);
      }
    });

    const group = document.createElement("div");
    group.classList.add("tag-category-group", "tag-category-" + category.id);

    const heading = document.createElement("div");
    heading.classList.add("tag-category-heading");
    heading.innerHTML = `
      <h3>${escapeHtml(category.title)}</h3>
      <p>${escapeHtml(category.description)}</p>
    `;
    group.appendChild(heading);

    const buttonBox = document.createElement("div");
    buttonBox.classList.add("tag-category-buttons");

    categoryLabels.forEach(function (label) {
      buttonBox.appendChild(createTagButton(label, buttonClass, datasetName));
    });

    group.appendChild(buttonBox);
    container.appendChild(group);
  });

  const otherLabels = availableLabels.filter(function (label) {
    return !usedLabels.includes(label);
  });

  if (otherLabels.length > 0) {
    const group = document.createElement("div");
    group.classList.add("tag-category-group", "tag-category-other");
    const heading = document.createElement("div");
    heading.classList.add("tag-category-heading");
    heading.innerHTML = `<h3>その他</h3><p>登録本から自動抽出された安全タグです。</p>`;
    group.appendChild(heading);

    const buttonBox = document.createElement("div");
    buttonBox.classList.add("tag-category-buttons");
    otherLabels.forEach(function (label) {
      buttonBox.appendChild(createTagButton(label, buttonClass, datasetName));
    });
    group.appendChild(buttonBox);
    container.appendChild(group);
  }

  const internalLabels = getAllInternalPickerLabels();

  if (internalLabels.length > 0) {
    const group = document.createElement("div");
    group.classList.add("tag-category-group", "tag-category-internal", "internal-tag-details");

    const heading = document.createElement("div");
    heading.classList.add("tag-category-heading");
    heading.innerHTML = `
      <h3>内部タグ（ネタバレ注意・複数推奨）</h3>
      <p>作品の細かい方向性を調整するタグです。1つだけ選ぶと見えすぎる場合があるため、2〜3個以上を組み合わせるのがおすすめです。</p>
    `;
    group.appendChild(heading);

    const buttonBox = document.createElement("div");
    buttonBox.classList.add("tag-category-buttons");
    internalLabels.forEach(function (label) {
      buttonBox.appendChild(createTagButton(label, buttonClass, datasetName));
    });

    group.appendChild(buttonBox);
    container.appendChild(group);
  }
}

function createTagButton(label, buttonClass, datasetName) {
  const button = document.createElement("button");
  button.classList.add(buttonClass);

  if (datasetName === "genre") {
    button.dataset.genre = label;
  } else {
    button.dataset.exclude = label;
  }

  button.textContent = label;
  return button;
}

function bindFilterButtons() {
  genreButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filterName = button.dataset.genre;

      if (filterName === "すべて") {
        selectedFilters = [];
      } else if (selectedFilters.includes(filterName)) {
        selectedFilters = selectedFilters.filter(function (name) {
          return name !== filterName;
        });
      } else {
        selectedFilters.push(filterName);
      }

      updateFilterButtons();
      selectedArea.classList.add("hidden");
    });
  });
}

function bindExcludeButtons() {
  excludeTagButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filterName = button.dataset.exclude;

      if (selectedExcludeFilters.includes(filterName)) {
        selectedExcludeFilters = selectedExcludeFilters.filter(function (name) {
          return name !== filterName;
        });
      } else {
        selectedExcludeFilters.push(filterName);
      }

      updateExcludeButtons();
      refreshCurrentResults();
      selectedArea.classList.add("hidden");
    });
  });
}

function updateFilterButtons() {
  genreButtons.forEach(function (button) {
    const filterName = button.dataset.genre;

    if (filterName === "すべて") {
      button.classList.toggle("active", selectedFilters.length === 0);
    } else {
      button.classList.toggle("active", selectedFilters.includes(filterName));
    }
  });

  if (selectedFilters.length === 0) {
    selectedGenreElement.textContent = "選択中：すべて";
  } else {
    selectedGenreElement.textContent = "選択中：" + selectedFilters.join(" / ");
  }
}

function updateExcludeButtons() {
  excludeTagButtons.forEach(function (button) {
    const filterName = button.dataset.exclude;
    button.classList.toggle("active", selectedExcludeFilters.includes(filterName));
  });

  if (selectedExcludeFilters.length === 0) {
    excludeStatus.textContent = "除外タグ：なし";
  } else {
    excludeStatus.textContent = "除外タグ：" + selectedExcludeFilters.join(" / ");
  }
}

function updateModeButtons() {
  modeOptions.forEach(function (option) {
    const input = option.querySelector('input[name="displayMode"]');
    option.classList.toggle("active", input.checked);
  });
}

function updateGachaTypeButtons() {
  gachaTypeOptions.forEach(function (option) {
    const input = option.querySelector('input[name="gachaType"]');
    option.classList.toggle("active", input.checked);
  });

  if (gachaType === "want") {
    gachaButton.textContent = "読みたい本から引く";
  } else if (gachaType === "recommend") {
    gachaButton.textContent = "おすすめを引く";
  } else if (gachaType === "masterpiece") {
    gachaButton.textContent = "名作優先で引く";
  } else if (gachaType === "popular") {
    gachaButton.textContent = "最近人気上昇で引く";

  } else if (gachaType === "logic") {
    gachaButton.textContent = "論理・頭脳戦で引く";
  } else if (gachaType === "random") {
    gachaButton.textContent = "完全ランダムで引く";
  } else {
    gachaButton.textContent = "小説を引く";
  }
}

function getGachaTypeLabel(type) {
  const labels = {
    all: "通常ガチャ",
    want: "読みたい本",
    recommend: "自分専用おすすめ候補",
    masterpiece: "名作優先候補",
    popular: "最近人気上昇候補",
    logic: "論理・頭脳戦候補",
    random: "完全ランダム候補"
  };

  return labels[type] || "登録本全体";
}

function updateResultMessage(resultCount, candidateCount) {
  const conditionText = selectedFilters.length === 0 ? "すべて" : selectedFilters.join(" / ");
  const excludeText = buildExcludeText();
  let sourceText = getGachaTypeLabel(gachaType);

  if (displayMode === "spoilerSafe") {
    resultMessage.textContent =
      sourceText + "から、" + excludeText + "条件に合う候補" + candidateCount + "冊の中から" + resultCount + "冊表示しています。ネタバレ回避のため、結果にはタイトル・作者・出版社のみ表示しています。";
  } else {
    resultMessage.textContent =
      sourceText + "から、" + excludeText + "「" + conditionText + "」に合う候補" + candidateCount + "冊の中から" + resultCount + "冊表示しています。気になった本を選んでください。";
  }
}

function buildExcludeText() {
  const parts = [];

  if (excludeReadBooksCheckbox.checked) {
    parts.push("既読本を除外");
  }

  if (selectedExcludeFilters.length > 0) {
    parts.push("除外タグ：" + selectedExcludeFilters.join(" / "));
  }

  if (parts.length === 0) {
    return "";
  }

  return parts.join("、") + "して、";
}

function getRandomBooks(bookArray, count) {
  const copiedBooks = [...bookArray];

  for (let i = copiedBooks.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temporary = copiedBooks[i];

    copiedBooks[i] = copiedBooks[randomIndex];
    copiedBooks[randomIndex] = temporary;
  }

  return copiedBooks.slice(0, count);
}

function getWeightedRandomBooks(bookArray, count, mode) {
  const currentMode = mode || "balanced";
  const remainingBooks = bookArray.map(function (book) {
    return {
      book: book,
      weight: Math.max(1, calculateBookWeight(book, currentMode))
    };
  });

  const selectedBooks = [];

  while (remainingBooks.length > 0 && selectedBooks.length < count) {
    const totalWeight = remainingBooks.reduce(function (sum, item) {
      return sum + item.weight;
    }, 0);

    let randomValue = Math.random() * totalWeight;
    let selectedIndex = 0;

    for (let i = 0; i < remainingBooks.length; i++) {
      randomValue -= remainingBooks[i].weight;

      if (randomValue <= 0) {
        selectedIndex = i;
        break;
      }
    }

    selectedBooks.push(remainingBooks[selectedIndex].book);
    remainingBooks.splice(selectedIndex, 1);
  }

  return selectedBooks;
}

function getCurrentWeightMode() {
  if (["masterpiece", "popular", "logic", "recommend", "want", "all"].includes(gachaType)) {
    return gachaType;
  }

  return "balanced";
}

function calculateBookWeight(book, mode) {
  const baseScore = getBaseScoreForMode(book, mode);
  const rankBonus = getRankMultiplier(book.rank);
  const exposurePenalty = getExposurePenalty(book.id);
  const personalBonus = mode === "recommend" ? Math.max(1, Number(book.recommendationScore) || 1) / 8 : 1;
  const selectedFilterMatchBonus = mode === "random" ? 1 : getSelectedFilterMatchMultiplier(book);

  return Math.pow(Math.max(1, baseScore), 1.35) * rankBonus * exposurePenalty * personalBonus * selectedFilterMatchBonus;
}

function getSelectedFilterMatchMultiplier(book) {
  if (selectedFilters.length <= 1) {
    return 1;
  }

  const bookLabels = getBookLabels(book);
  const matchCount = selectedFilters.filter(function (label) {
    return bookLabels.includes(label);
  }).length;

  if (matchCount <= 1) {
    return 1;
  }

  return Math.min(1.45, 1 + (matchCount - 1) * 0.12);
}

function getInternalSignalBonus(book, mode) {
  const labels = getBookLabels(book);
  const has = function (label) { return labels.includes(label); };
  let bonus = 0;

  const logicWeights = {
    "盤面支配": 18,
    "高計画性": 16,
    "先読み": 15,
    "頭脳戦": 14,
    "天才型": 12,
    "ゲーム理論": 12,
    "特殊ルール推理": 12,
    "仮説検証": 10,
    "論理パズル型": 10,
    "不可能犯罪解体": 10,
    "心理誘導": 8,
    "閉鎖空間の知略": 8,
    "対決型": 8,
    "知的快感": 8,
    "ロジック重視": 8,
    "探偵がかっこいい": 5,
    "犯人側が強い": 5,
    "探偵側が強い": 5
  };

  Object.keys(logicWeights).forEach(function (label) {
    if (has(label)) {
      bonus += logicWeights[label];
    }
  });

  if (mode === "logic") {
    return Math.min(30, bonus);
  }

  if (mode === "recommend") {
    return Math.min(24, bonus * 0.75);
  }

  if (mode === "masterpiece") {
    let valueBonus = 0;
    ["必読級", "名作枠", "古典的価値", "高品質", "本格賞評価", "ランキング評価"].forEach(function (label) {
      if (has(label)) valueBonus += 5;
    });
    return Math.min(20, valueBonus + bonus * 0.20);
  }

  if (mode === "popular") {
    let risingBonus = 0;
    ["最近人気上昇", "近年人気"].forEach(function (label) {
      if (has(label)) risingBonus += 8;
    });
    ["超人気作", "人気作", "映像化", "ランキング評価"].forEach(function (label) {
      if (has(label)) risingBonus += 4;
    });
    ["高品質", "名作枠", "必読級"].forEach(function (label) {
      if (has(label)) risingBonus += 3;
    });
    return Math.min(24, risingBonus);
  }

  if (mode === "easy") {
    let easyBonus = 0;
    ["読みやすい", "入門向け", "短め", "ライト", "短編集"].forEach(function (label) {
      if (has(label)) easyBonus += 4;
    });
    ["上級者向け", "重厚", "クセ強め"].forEach(function (label) {
      if (has(label)) easyBonus -= 4;
    });
    return Math.max(-12, Math.min(16, easyBonus));
  }

  if (mode === "want") {
    return Math.min(18, bonus * 0.45);
  }

  return Math.min(16, bonus * 0.35);
}

function getBaseScoreForMode(book, mode) {
  const scores = getBookScores(book);
  const labels = getBookLabels(book);
  const internalBonus = getInternalSignalBonus(book, mode);

  if (mode === "masterpiece") {
    return scores.quality * 0.48 + scores.public * 0.24 + scores.logic * 0.14 + scores.taste * 0.10 + scores.character * 0.04 + internalBonus;
  }

  if (mode === "popular") {
    let risingScore = 50;
    if (labels.includes("最近人気上昇")) risingScore += 26;
    if (labels.includes("近年人気")) risingScore += 18;
    if (labels.includes("超人気作")) risingScore += 8;
    if (labels.includes("人気作")) risingScore += 6;
    if (labels.includes("映像化")) risingScore += 5;
    risingScore = Math.max(35, Math.min(100, risingScore));
    return risingScore * 0.42 + scores.quality * 0.28 + scores.public * 0.18 + scores.logic * 0.06 + scores.taste * 0.06 + internalBonus;
  }

  if (mode === "easy") {
    let readability = 62;
    if (labels.includes("読みやすい")) readability += 14;
    if (labels.includes("入門向け")) readability += 14;
    if (labels.includes("短め")) readability += 8;
    if (labels.includes("重厚")) readability -= 8;
    if (labels.includes("上級者向け")) readability -= 10;
    if (labels.includes("クセ強め")) readability -= 8;
    readability = Math.max(35, Math.min(100, readability));
    return readability * 0.48 + scores.public * 0.22 + scores.quality * 0.18 + scores.taste * 0.08 + scores.character * 0.04 + internalBonus;
  }

  if (mode === "logic") {
    return scores.logic * 0.44 + scores.taste * 0.22 + scores.quality * 0.18 + scores.character * 0.12 + scores.public * 0.04 + internalBonus;
  }

  if (mode === "recommend") {
    return scores.taste * 0.34 + scores.logic * 0.28 + scores.quality * 0.18 + scores.character * 0.14 + scores.public * 0.06 + internalBonus;
  }

  if (mode === "want") {
    return scores.taste * 0.28 + scores.quality * 0.24 + scores.logic * 0.22 + scores.public * 0.16 + scores.character * 0.10 + internalBonus;
  }

  return scores.quality * 0.28 + scores.logic * 0.22 + scores.taste * 0.20 + scores.public * 0.18 + scores.character * 0.12 + internalBonus;
}

function getBookScores(book) {
  const fallback = { quality: 65, public: 60, logic: 60, taste: 60, character: 60 };
  return Object.assign({}, fallback, book.scores || {});
}

function getRankMultiplier(rank) {
  if (rank === "S") return 2.10;
  if (rank === "A") return 1.55;
  if (rank === "B") return 1.15;
  if (rank === "C") return 0.82;
  if (rank === "D") return 0.50;
  if (rank === "E") return 0.30;
  if (rank === "F") return 0.16;
  return 1.0;
}

function getExposurePenalty(bookId) {
  const stat = shownStats[String(bookId)];

  if (!stat) {
    return 1.12;
  }

  const shownCount = Number(stat.count) || 0;
  const lastShownAt = Number(stat.lastShownAt) || 0;
  const hoursSinceShown = lastShownAt ? (Date.now() - lastShownAt) / (1000 * 60 * 60) : 999;
  let recencyPenalty = 1;

  if (hoursSinceShown < 1) {
    recencyPenalty = 0.34;
  } else if (hoursSinceShown < 12) {
    recencyPenalty = 0.52;
  } else if (hoursSinceShown < 48) {
    recencyPenalty = 0.72;
  } else if (hoursSinceShown < 168) {
    recencyPenalty = 0.88;
  }

  const countPenalty = Math.max(0.58, 1 - shownCount * 0.035);
  return recencyPenalty * countPenalty;
}

function recordShownBooks(bookArray) {
  const now = Date.now();

  bookArray.forEach(function (book) {
    const key = String(book.id);
    const current = shownStats[key] || { count: 0, lastShownAt: 0 };
    shownStats[key] = {
      count: (Number(current.count) || 0) + 1,
      lastShownAt: now
    };
  });

  saveShownStats("mysteryGachaShownStats", shownStats);
}

function displayBooks(bookArray) {
  resultList.innerHTML = "";

  bookArray.forEach(function (book, index) {
    const card = document.createElement("article");
    card.classList.add("result-card");

    if (displayMode === "spoilerSafe") {
      card.classList.add("spoiler-safe");
      card.innerHTML = createSpoilerSafeCardHtml(book, index);
    } else {
      card.innerHTML = createNormalCardHtml(book, index);
    }

    if (readBookIds.includes(book.id)) {
      card.classList.add("already-read");
    }

    if (wantBookIds.includes(book.id)) {
      card.classList.add("already-want");
    }

    const selectButton = card.querySelector(".select-book-button");
    const detailButton = card.querySelector(".detail-book-button");
    const wantButton = card.querySelector(".want-book-button");
    const readButton = card.querySelector(".read-book-button");
    const ratingButton = card.querySelector(".rating-book-button");

    selectButton.addEventListener("click", function () {
      const allCards = document.querySelectorAll(".result-card");

      allCards.forEach(function (card) {
        card.classList.remove("selected");
      });

      card.classList.add("selected");

      selectedArea.classList.remove("hidden");
      selectedTitle.textContent = "選択中：" + book.title;
      selectedText.textContent = "この本を次に読む候補として選びました。作者は" + book.author + "、出版社は" + book.publisher + "です。";
    });

    detailButton.addEventListener("click", function () {
      showBookDetail(book.id);
    });

    wantButton.addEventListener("click", function () {
      toggleWantBook(book.id);
      refreshCurrentResults();
      updateMypage();
    });

    readButton.addEventListener("click", function () {
      markAsRead(book.id);
      refreshCurrentResults();
      updateMypage();
    });

    if (ratingButton) {
      ratingButton.addEventListener("click", function () {
        showBookDetail(book.id);
      });
    }

    resultList.appendChild(card);
  });
}

function createTagSpans(labels) {
  if (!labels || labels.length === 0) {
    return `<span class="tag muted-tag">表示タグなし</span>`;
  }

  return labels.map(function (tag) {
    return `<span class="tag">#${escapeHtml(tag)}</span>`;
  }).join("");
}

function createNormalCardHtml(book, index) {
  return `
    <div class="result-number">候補 ${index + 1}</div>

    <div class="result-main">
      <h3>${escapeHtml(book.title)}</h3>

      <div class="book-meta">
        <span>作者：${escapeHtml(book.author)}</span>
        <span>出版社：${escapeHtml(book.publisher)}</span>
      </div>

      <p class="book-description">${escapeHtml(book.description)}</p>

      <div class="tags">
        ${createTagSpans(getBookDisplayLabels(book))}
      </div>
      ${createRecommendationReasonHtml(book)}
    </div>

    ${createBookActionButtonsHtml(book)}
  `;
}

function createSpoilerSafeCardHtml(book, index) {
  return `
    <div class="result-number">候補 ${index + 1}</div>

    <div class="result-main">
      <h3>${escapeHtml(book.title)}</h3>

      <div class="book-meta">
        <span>作者：${escapeHtml(book.author)}</span>
        <span>出版社：${escapeHtml(book.publisher)}</span>
      </div>
    </div>

    ${createBookActionButtonsHtml(book)}
  `;
}

function createRecommendationReasonHtml(book) {
  if (gachaType !== "recommend" || displayMode === "spoilerSafe" || !book.recommendationReason) {
    return "";
  }

  return `<p class="recommendation-reason">おすすめ理由：${escapeHtml(book.recommendationReason)}</p>`;
}

function createBookActionButtonsHtml(book) {
  const wantText = wantBookIds.includes(book.id) ? "読みたい済" : "読みたい";
  const readText = readBookIds.includes(book.id) ? "既読済" : "既読にする";
  const ratingButtonHtml = readBookIds.includes(book.id)
    ? `<button class="rating-book-button">読後評価</button>`
    : "";

  return `
    <div class="book-actions">
      <button class="select-book-button">選ぶ</button>
      <button class="detail-book-button">詳細</button>
      <button class="want-book-button">${wantText}</button>
      <button class="read-book-button">${readText}</button>
      ${ratingButtonHtml}
    </div>
  `;
}

function showBookDetail(bookId, forceReveal) {
  const book = getBookById(bookId);

  if (!book) {
    return;
  }

  const query = encodeURIComponent(book.title + " " + book.author);
  const shouldHideSpoilerInfo = displayMode === "spoilerSafe" && !forceReveal;

  detailContent.innerHTML = `
    <h3 class="detail-title">${escapeHtml(book.title)}</h3>
    <div class="book-meta">
      <span>作者：${escapeHtml(book.author)}</span>
      <span>出版社：${escapeHtml(book.publisher)}</span>
    </div>

    ${shouldHideSpoilerInfo ? createSpoilerSafeDetailHtml(book) : createFullDetailHtml(book)}

    ${createRatingDetailHtml(book)}

    <div class="detail-block">
      <h3>外部口コミサイト</h3>
      <p class="detail-note">外部サイトにはネタバレを含む感想が表示される場合があります。</p>
      <div class="review-links">
        <a href="https://bookmeter.com/search?keyword=${query}" target="_blank" rel="noopener noreferrer">読書メーターで探す</a>
        <a href="https://booklog.jp/search?keyword=${query}" target="_blank" rel="noopener noreferrer">ブクログで探す</a>
        <a href="https://www.amazon.co.jp/s?k=${query}" target="_blank" rel="noopener noreferrer">Amazonで探す</a>
      </div>
    </div>

    <div class="detail-actions">
      <button class="detail-action-button" id="detailWantButton">${wantBookIds.includes(book.id) ? "読みたいから外す" : "読みたいに追加"}</button>
      <button class="detail-action-button" id="detailReadButton">${readBookIds.includes(book.id) ? "既読済" : "既読にする"}</button>
    </div>
  `;

  const revealButton = document.getElementById("revealDetailButton");
  const detailWantButton = document.getElementById("detailWantButton");
  const detailReadButton = document.getElementById("detailReadButton");
  const saveRatingButton = document.getElementById("saveRatingButton-" + book.id);
  const deleteRatingButton = document.getElementById("deleteRatingButton-" + book.id);

  if (revealButton) {
    revealButton.addEventListener("click", function () {
      showBookDetail(book.id, true);
    });
  }

  detailWantButton.addEventListener("click", function () {
    toggleWantBook(book.id);
    refreshCurrentResults();
    updateMypage();
    showBookDetail(book.id, forceReveal);
  });

  detailReadButton.addEventListener("click", function () {
    markAsRead(book.id);
    refreshCurrentResults();
    updateMypage();
    showBookDetail(book.id, forceReveal);
  });

  if (saveRatingButton) {
    saveRatingButton.addEventListener("click", function () {
      saveBookRatingFromForm(book.id);
      refreshCurrentResults();
      updateMypage();
      showBookDetail(book.id, forceReveal);
    });
  }

  if (deleteRatingButton) {
    deleteRatingButton.addEventListener("click", function () {
      deleteBookRating(book.id);
      refreshCurrentResults();
      updateMypage();
      showBookDetail(book.id, forceReveal);
    });
  }

  detailArea.classList.remove("hidden");
  detailArea.scrollIntoView({ behavior: "smooth", block: "start" });
}

function createSpoilerSafeDetailHtml(book) {
  return `
    <div class="detail-block">
      <h3>ネタバレ回避中</h3>
      <p class="detail-note">
        現在はネタバレ回避モードです。タグ・ジャンル・説明文は、作品の仕掛けを連想させる可能性があるため隠しています。
      </p>
      <button class="small-button" id="revealDetailButton">タグ・説明文を表示する</button>
    </div>
  `;
}

function createFullDetailHtml(book) {
  return `
    <div class="detail-block">
      <h3>説明</h3>
      <p class="book-description">${escapeHtml(book.description)}</p>
    </div>

    <div class="detail-block">
      <h3>スコア</h3>
      ${createScoreSummaryHtml(book)}
    </div>

    <div class="detail-block">
      <h3>表示タグ</h3>
      <div class="detail-tags">
        ${createTagSpans(getBookDisplayLabels(book))}
      </div>
      <p class="detail-note">ここにはネタバレ危険タグを出しません。詳しい内部タグは下の折りたたみ内に隠しています。</p>
    </div>

    ${createInternalTagsHtml(book)}
  `;
}



function createRatingDetailHtml(book) {
  if (!readBookIds.includes(book.id)) {
    return `
      <div class="detail-block rating-block rating-empty-block">
        <h3>読後評価</h3>
        <p class="detail-note">既読にすると、読後評価を保存できます。</p>
      </div>
    `;
  }

  const ratingData = bookRatings[String(book.id)] || {};
  const bookIdText = escapeHtml(book.id);

  const ratingSummary = getRatingSummaryText(book.id);

  return `
    <details class="detail-block rating-block rating-collapsible">
      <summary>読後評価を開く<span>${escapeHtml(ratingSummary)}</span></summary>
      <div id="ratingBlock-${bookIdText}" class="rating-form-content">
        <p class="detail-note">評価と良かった理由は好みを加点し、微妙だった方向性は苦手なジャンル・読み味だけを減点します。</p>

        <div class="rating-options">
        ${RATING_OPTIONS.map(function (option) {
          const checked = ratingData.rating === option.value ? "checked" : "";
          return `
            <label class="rating-option">
              <input type="radio" name="rating-${bookIdText}" value="${escapeHtml(option.value)}" ${checked}>
              <span class="rating-label">${escapeHtml(option.label)}</span>
              <span class="rating-description">${escapeHtml(option.description)}</span>
            </label>
          `;
        }).join("")}
      </div>

      ${RATING_REASON_SECTIONS.map(function (section) {
        const selectedReasons = ratingData[section.field] || [];
        return `
          <div class="rating-reason-section">
            <h4>${escapeHtml(section.title)}</h4>
            <p class="detail-note">${escapeHtml(section.description)}</p>
            <div class="rating-reason-categories">
              ${section.categories.map(function (category) {
                return `
                  <details class="rating-reason-category">
                    <summary>${escapeHtml(category.title)}</summary>
                    <div class="rating-reason-grid">
                      ${category.reasons.map(function (reason) {
                        const checked = selectedReasons.includes(reason.value) ? "checked" : "";
                        return `
                          <label class="rating-reason-option">
                            <input type="checkbox" class="${escapeHtml(section.className)}" value="${escapeHtml(reason.value)}" ${checked}>
                            <span>${escapeHtml(reason.label)}</span>
                          </label>
                        `;
                      }).join("")}
                    </div>
                  </details>
                `;
              }).join("")}
            </div>
          </div>
        `;
      }).join("")}

      <label class="rating-memo-label" for="ratingMemo-${bookIdText}">自分用読書メモ（おすすめ計算には直接使われません）</label>
      <textarea id="ratingMemo-${bookIdText}" class="rating-memo" rows="3" maxlength="240" placeholder="例：ロジックは最高。ただし後味は少し重い。">${escapeHtml(ratingData.memo || "")}</textarea>

        <div class="rating-actions">
          <button class="small-button" id="saveRatingButton-${bookIdText}">読後評価を保存</button>
          <button class="danger-button" id="deleteRatingButton-${bookIdText}">評価を削除</button>
        </div>
      </div>
    </details>
  `;
}

function saveBookRatingFromForm(bookId) {
  const ratingBlock = document.getElementById("ratingBlock-" + bookId);

  if (!ratingBlock) {
    return;
  }

  const selectedRating = ratingBlock.querySelector('input[name="rating-' + bookId + '"]:checked');

  if (!selectedRating) {
    window.alert("まず読後評価を選んでください。");
    return;
  }

  bookRatings[String(bookId)] = {
    rating: selectedRating.value,
    likedReasons: getCheckedReasonValues(ratingBlock, "liked-reason-checkbox"),
    dislikedReasons: getCheckedReasonValues(ratingBlock, "disliked-reason-checkbox"),
    memo: String(document.getElementById("ratingMemo-" + bookId).value || "").trim().slice(0, 240),
    updatedAt: new Date().toISOString()
  };

  saveBookRatings("mysteryGachaBookRatings", bookRatings);
}

function getCheckedReasonValues(container, className) {
  return Array.from(container.querySelectorAll("." + className + ":checked"))
    .map(function (input) {
      return input.value;
    })
    .filter(function (value) {
      return Boolean(getReasonDefinition(value));
    });
}

function deleteBookRating(bookId) {
  if (!bookRatings[String(bookId)]) {
    return;
  }

  const confirmed = window.confirm("この本の読後評価を削除しますか？");

  if (!confirmed) {
    return;
  }

  delete bookRatings[String(bookId)];
  saveBookRatings("mysteryGachaBookRatings", bookRatings);
}

function getRatingSummaryText(bookId) {
  const ratingData = bookRatings[String(bookId)];

  if (!ratingData || !ratingData.rating) {
    return "未評価";
  }

  const totalReasonCount = (ratingData.likedReasons || []).length + (ratingData.dislikedReasons || []).length;
  const reasonText = totalReasonCount > 0 ? "・理由" + totalReasonCount + "個" : "";
  return (RATING_LABELS[ratingData.rating] || "評価あり") + reasonText;
}

function getReasonDefinition(value) {
  for (const section of RATING_REASON_SECTIONS) {
    for (const category of section.categories) {
      const found = category.reasons.find(function (reason) {
        return reason.value === value;
      });

      if (found) {
        return found;
      }
    }
  }

  return null;
}

function getReasonLabel(value) {
  const reason = getReasonDefinition(value);
  return reason ? reason.label : value;
}

function createInternalTagsHtml(book) {
  const internalLabels = getInternalOnlyLabels(book);

  if (internalLabels.length === 0) {
    return "";
  }

  return `
    <div class="detail-block internal-tag-details">
      <details>
        <summary>内部タグを見る（ネタバレ注意）</summary>
        <p class="detail-note">この内部タグはガチャ計算・自分専用おすすめ・検索に使います。仕掛けを連想する可能性があるため通常表示では隠しています。</p>
        <div class="detail-tags">
          ${createTagSpans(internalLabels)}
        </div>
      </details>
    </div>
  `;
}

function createScoreSummaryHtml(book) {
  const scores = getBookScores(book);
  const basis = Array.isArray(book.scoreBasis) ? book.scoreBasis : ["総合評価"];
  const rows = [
    ["クオリティ", scores.quality],
    ["世間の評価", scores.public],
    ["ロジック", scores.logic],
    ["あなたの好み", scores.taste],
    ["人物のかっこよさ", scores.character]
  ];

  return `
    <div class="score-overview">
      <span class="rank-badge rank-${escapeHtml(book.rank || "B")}">${escapeHtml(book.rank || "B")}</span>
      <strong>総合 ${escapeHtml(book.totalScore || getApproxTotalScore(book))} / 100</strong>
      <span class="score-note">S〜Fは、作品の優劣だけでなく、このサイトのガチャでの出しやすさも含めた分類です。D以下にも「好みからは外れやすいが質は高い作品」を含みます。</span>
    </div>
    <div class="score-grid">
      ${rows.map(function (row) {
        return `<div class="score-row"><span>${escapeHtml(row[0])}</span><meter min="0" max="100" value="${escapeHtml(row[1])}"></meter><strong>${escapeHtml(row[1])}</strong></div>`;
      }).join("")}
    </div>
    <p class="score-basis">根拠：${basis.map(function (item) { return escapeHtml(item); }).join(" / ")}</p>
  `;
}

function getApproxTotalScore(book) {
  const scores = getBookScores(book);
  return Math.round(scores.quality * 0.28 + scores.public * 0.18 + scores.logic * 0.24 + scores.taste * 0.20 + scores.character * 0.10);
}

function toggleWantBook(bookId) {
  // 「読みたい」は読みたいリストだけを切り替える。
  // 既読本を誤って読みたいに追加しても、既読状態や読後評価は消さない。
  if (wantBookIds.includes(bookId)) {
    wantBookIds = wantBookIds.filter(function (id) {
      return id !== bookId;
    });
  } else {
    wantBookIds.push(bookId);
  }

  wantBookIds = Array.from(new Set(wantBookIds));
  saveIdList("mysteryGachaWantBookIds", wantBookIds);
}

function markAsRead(bookId) {
  if (!readBookIds.includes(bookId)) {
    readBookIds.push(bookId);
  }

  wantBookIds = wantBookIds.filter(function (id) {
    return id !== bookId;
  });

  saveIdList("mysteryGachaReadBookIds", readBookIds);
  saveIdList("mysteryGachaWantBookIds", wantBookIds);
}

function removeReadBook(bookId) {
  readBookIds = readBookIds.filter(function (id) {
    return id !== bookId;
  });
  delete bookRatings[String(bookId)];

  saveIdList("mysteryGachaReadBookIds", readBookIds);
  saveBookRatings("mysteryGachaBookRatings", bookRatings);
  refreshCurrentResults();
  updateMypage();
}

function removeWantBook(bookId) {
  wantBookIds = wantBookIds.filter(function (id) {
    return id !== bookId;
  });

  saveIdList("mysteryGachaWantBookIds", wantBookIds);
  refreshCurrentResults();
  updateMypage();
}

function moveWantBookToRead(bookId) {
  markAsRead(bookId);
  refreshCurrentResults();
  updateMypage();
}

function refreshCurrentResults() {
  if (currentResultBooks.length === 0) {
    return;
  }

  currentResultBooks = applyAllExclusions(currentResultBooks);
  displayBooks(currentResultBooks);

  if (currentResultBooks.length === 0) {
    resultMessage.textContent = "表示中の本はすべて除外条件に当てはまりました。もう一度ガチャを引いてください。";
  } else {
    updateResultMessage(currentResultBooks.length, getCurrentCandidateCount());
  }

  selectedArea.classList.add("hidden");
}

function updateMypage() {
  wantCount.textContent = wantBookIds.length + "冊";
  readCount.textContent = readBookIds.length + "冊";
  favoriteLabels.innerHTML = getFavoriteLabelsHtml();

  const ratedCountElement = document.getElementById("ratedCount");
  const learningConfidenceElement = document.getElementById("learningConfidence");
  const preferenceDetailElement = document.getElementById("preferenceDetail");
  const preferenceModel = buildPreferenceModel();

  if (ratedCountElement) {
    ratedCountElement.textContent = preferenceModel.ratedCount + "冊";
  }

  if (learningConfidenceElement) {
    learningConfidenceElement.textContent = Math.round(preferenceModel.confidence * 100) + "%";
  }

  if (preferenceDetailElement) {
    preferenceDetailElement.innerHTML = createPreferenceDetailHtml(preferenceModel);
  }

  renderSavedBookList(wantList, wantBookIds, "want");
  renderSavedBookList(readList, readBookIds, "read");
}

function getFavoriteLabelsHtml() {
  const scores = buildProfileScores();
  const labels = getTopProfileLabels(scores, 5, true);

  if (labels.length === 0) {
    return "まだ不明";
  }

  return labels.map(function (label) {
    return `<span class="profile-pill">${escapeHtml(label)}</span>`;
  }).join("");
}

function createPreferenceDetailHtml(preferenceModel) {
  const positiveLabels = getTopProfileLabels(preferenceModel.labelScores, 8, true);
  const negativeLabels = getTopProfileLabels(preferenceModel.labelScores, 8, false);
  const scorePriorities = getScorePriorityTexts(preferenceModel);

  if (positiveLabels.length === 0 && negativeLabels.length === 0 && scorePriorities.length === 0) {
    return `<p class="empty-list">読後評価を保存すると、ここに学習された好みが表示されます。</p>`;
  }

  return `
    <div class="preference-detail-grid">
      <div>
        <h3>強く好む傾向</h3>
        <p>${positiveLabels.length ? positiveLabels.map(function (label) { return `<span class="profile-pill">${escapeHtml(label)}</span>`; }).join("") : "まだ不明"}</p>
      </div>
      <div>
        <h3>避けた方がよさそうな傾向</h3>
        <p>${negativeLabels.length ? negativeLabels.map(function (label) { return `<span class="profile-pill negative-pill">${escapeHtml(label)}</span>`; }).join("") : "まだ不明"}</p>
      </div>
      <div>
        <h3>重視していそうな要素</h3>
        <p>${scorePriorities.length ? scorePriorities.join(" / ") : "まだ不明"}</p>
      </div>
    </div>
  `;
}

function getTopProfileLabels(scores, limit, positive) {
  return Object.keys(scores)
    .filter(function (label) {
      if (label === "ミステリ" || isUnsafeRecommendationReasonLabel(label)) {
        return false;
      }
      return positive ? scores[label] > 0 : scores[label] < 0;
    })
    .sort(function (a, b) {
      return positive ? scores[b] - scores[a] : scores[a] - scores[b];
    })
    .slice(0, limit);
}

function getScorePriorityTexts(preferenceModel) {
  const names = {
    quality: "クオリティ",
    public: "世間評価",
    logic: "ロジック",
    taste: "好み一致度",
    character: "人物のかっこよさ"
  };

  return Object.keys(preferenceModel.scoreWeights || {})
    .filter(function (key) {
      return preferenceModel.scoreWeights[key] > 0;
    })
    .sort(function (a, b) {
      return preferenceModel.scoreWeights[b] - preferenceModel.scoreWeights[a];
    })
    .slice(0, 3)
    .map(function (key) {
      return names[key];
    });
}

function renderSavedBookList(container, idList, listType) {
  container.innerHTML = "";

  const savedBooks = getBooksFromIds(idList);

  if (savedBooks.length === 0) {
    container.classList.add("empty-list");
    container.textContent = "まだありません。";
    return;
  }

  container.classList.remove("empty-list");

  savedBooks.forEach(function (book) {
    const item = document.createElement("div");
    item.classList.add("saved-book-item");

    const info = document.createElement("div");
    info.classList.add("saved-book-info");
    info.innerHTML = `
      <strong>${escapeHtml(book.title)}</strong>
      <span>${escapeHtml(book.author)} / ${escapeHtml(book.publisher)}</span>
      ${listType === "read" ? `<span class="saved-rating-summary">読後評価：${escapeHtml(getRatingSummaryText(book.id))}</span>` : ""}
    `;

    const actions = document.createElement("div");
    actions.classList.add("saved-book-actions");

    const detailButton = document.createElement("button");
    detailButton.textContent = "詳細";
    detailButton.addEventListener("click", function () {
      showBookDetail(book.id);
    });
    actions.appendChild(detailButton);

    if (listType === "want") {
      const readButton = document.createElement("button");
      readButton.textContent = "既読にする";
      readButton.addEventListener("click", function () {
        moveWantBookToRead(book.id);
      });
      actions.appendChild(readButton);
    }

    if (listType === "read") {
      const ratingButton = document.createElement("button");
      ratingButton.textContent = "評価";
      ratingButton.addEventListener("click", function () {
        showBookDetail(book.id);
      });
      actions.appendChild(ratingButton);
    }

    const removeButton = document.createElement("button");
    removeButton.textContent = "外す";
    removeButton.addEventListener("click", function () {
      if (listType === "want") {
        removeWantBook(book.id);
      } else {
        removeReadBook(book.id);
      }
    });
    actions.appendChild(removeButton);

    item.appendChild(info);
    item.appendChild(actions);
    container.appendChild(item);
  });
}

function getBooksFromIds(idList) {
  return idList
    .map(function (id) {
      return getBookById(id);
    })
    .filter(Boolean);
}

function getBookById(bookId) {
  return books.find(function (book) {
    return book.id === bookId;
  });
}

function getSafeStorageItem(storageKey) {
  try {
    return localStorage.getItem(storageKey);
  } catch (error) {
    return null;
  }
}

function setSafeStorageItem(storageKey, value) {
  try {
    localStorage.setItem(storageKey, value);
    return true;
  } catch (error) {
    return false;
  }
}

function loadIdList(storageKey) {
  try {
    const value = getSafeStorageItem(storageKey);

    if (!value) {
      return [];
    }

    const parsedValue = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .map(function (id) {
        return Number(id);
      })
      .filter(function (id) {
        return Number.isInteger(id);
      });
  } catch (error) {
    return [];
  }
}

function saveIdList(storageKey, idList) {
  const uniqueIds = Array.from(new Set(idList));
  setSafeStorageItem(storageKey, JSON.stringify(uniqueIds));
}



function loadBookRatings(storageKey) {
  try {
    const value = getSafeStorageItem(storageKey);

    if (!value) {
      return {};
    }

    return cleanImportedBookRatings(JSON.parse(value));
  } catch (error) {
    return {};
  }
}

function saveBookRatings(storageKey, ratings) {
  setSafeStorageItem(storageKey, JSON.stringify(ratings || {}));
}

function cleanImportedBookRatings(ratings, allowedReadIds) {
  if (!ratings || typeof ratings !== "object" || Array.isArray(ratings)) {
    return {};
  }

  const cleaned = {};
  const validReasonValues = getAllRatingReasonValues();

  Object.keys(ratings).forEach(function (key) {
    const id = Number(key);
    const ratingData = ratings[key] || {};

    if (!Number.isInteger(id) || !getBookById(id)) {
      return;
    }

    if (Array.isArray(allowedReadIds) && !allowedReadIds.includes(id)) {
      return;
    }

    if (!RATING_VALUES.hasOwnProperty(ratingData.rating)) {
      return;
    }

    cleaned[String(id)] = {
      rating: ratingData.rating,
      likedReasons: cleanReasonList(ratingData.likedReasons, validReasonValues),
      dislikedReasons: cleanReasonList(ratingData.dislikedReasons, validReasonValues),
      memo: String(ratingData.memo || "").trim().slice(0, 240),
      updatedAt: String(ratingData.updatedAt || new Date().toISOString())
    };
  });

  return cleaned;
}

function cleanReasonList(reasonList, validReasonValues) {
  if (!Array.isArray(reasonList)) {
    return [];
  }

  return Array.from(new Set(reasonList.filter(function (reason) {
    return validReasonValues.includes(reason);
  })));
}

function getAllRatingReasonValues() {
  const values = [];

  RATING_REASON_SECTIONS.forEach(function (section) {
    section.categories.forEach(function (category) {
      category.reasons.forEach(function (reason) {
        values.push(reason.value);
      });
    });
  });

  return values;
}

function getSelectedResultCount() {
  if (!resultCountSelect) {
    return 5;
  }

  const count = Number(resultCountSelect.value);

  if (!Number.isInteger(count) || count < 1) {
    return 5;
  }

  return count;
}

function runBookSearch() {
  const query = normalizeText(bookSearchInput.value);

  if (!query) {
    searchResultList.innerHTML = "";
    searchMessage.textContent = "検索ワードを入力してください。";
    return;
  }

  const matchedBooks = books.filter(function (book) {
    return buildSearchText(book).includes(query);
  });

  searchMessage.textContent = matchedBooks.length + "冊見つかりました。最大50冊まで表示します。";
  renderSearchResults(matchedBooks.slice(0, 50));
}

function buildSearchText(book) {
  return normalizeText([
    book.title,
    book.author,
    book.publisher,
    book.description,
    getBookFilterLabels(book).join(" ")
  ].join(" "));
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .normalize("NFKC");
}

function renderSearchResults(bookArray) {
  searchResultList.innerHTML = "";

  if (bookArray.length === 0) {
    searchResultList.innerHTML = `<p class="empty-list">該当する本はありません。</p>`;
    return;
  }

  bookArray.forEach(function (book) {
    const item = document.createElement("article");
    item.classList.add("search-result-item");

    item.innerHTML = `
      <div class="search-result-main">
        <h3>${escapeHtml(book.title)}</h3>
        <p>${escapeHtml(book.author)} / ${escapeHtml(book.publisher)}</p>
      </div>
      <div class="search-result-actions">
        <button class="search-detail-button">詳細</button>
        <button class="search-want-button">${wantBookIds.includes(book.id) ? "読みたい済" : "読みたい"}</button>
        <button class="search-read-button">${readBookIds.includes(book.id) ? "既読済" : "既読にする"}</button>
      </div>
    `;

    item.querySelector(".search-detail-button").addEventListener("click", function () {
      showBookDetail(book.id);
    });

    item.querySelector(".search-want-button").addEventListener("click", function () {
      toggleWantBook(book.id);
      refreshCurrentResults();
      updateMypage();
      runBookSearch();
    });

    item.querySelector(".search-read-button").addEventListener("click", function () {
      markAsRead(book.id);
      refreshCurrentResults();
      updateMypage();
      runBookSearch();
    });

    searchResultList.appendChild(item);
  });
}

function exportUserData() {
  const data = {
    app: "mystery-novel-gacha",
    version: 5,
    exportedAt: new Date().toISOString(),
    readBookIds: Array.from(new Set(readBookIds)),
    wantBookIds: Array.from(new Set(wantBookIds)),
    shownStats: shownStats,
    bookRatings: bookRatings
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "mystery-gacha-data.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  if (dataStatus) {
    dataStatus.textContent = "保存データを書き出しました。";
  }
}

function importUserData(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    try {
      const importedData = JSON.parse(reader.result);
      const importedReadIds = cleanImportedIds(importedData.readBookIds || []);
      let importedWantIds = cleanImportedIds(importedData.wantBookIds || []);
      const importedShownStats = cleanImportedShownStats(importedData.shownStats || {});
      const importedBookRatings = cleanImportedBookRatings(importedData.bookRatings || {}, importedReadIds);

      importedWantIds = importedWantIds.filter(function (id) {
        return !importedReadIds.includes(id);
      });

      const confirmed = window.confirm("現在の読みたい本・既読本・読後評価データを、読み込んだデータで上書きしますか？");

      if (!confirmed) {
        importDataInput.value = "";
        return;
      }

      readBookIds = importedReadIds;
      wantBookIds = importedWantIds;
      shownStats = importedShownStats;
      bookRatings = importedBookRatings;
      saveIdList("mysteryGachaReadBookIds", readBookIds);
      saveIdList("mysteryGachaWantBookIds", wantBookIds);
      saveShownStats("mysteryGachaShownStats", shownStats);
      saveBookRatings("mysteryGachaBookRatings", bookRatings);

      updateMypage();
      refreshCurrentResults();
      if (bookSearchInput && bookSearchInput.value.trim()) {
        runBookSearch();
      }

      dataStatus.textContent = "保存データを読み込みました。";
    } catch (error) {
      dataStatus.textContent = "読み込みに失敗しました。JSONファイルを確認してください。";
    } finally {
      importDataInput.value = "";
    }
  };

  reader.readAsText(file);
}

function cleanImportedIds(idList) {
  if (!Array.isArray(idList)) {
    return [];
  }

  return Array.from(new Set(idList
    .map(function (id) {
      return Number(id);
    })
    .filter(function (id) {
      return Number.isInteger(id) && getBookById(id);
    })));
}

function loadShownStats(storageKey) {
  try {
    const value = getSafeStorageItem(storageKey);

    if (!value) {
      return {};
    }

    return cleanImportedShownStats(JSON.parse(value));
  } catch (error) {
    return {};
  }
}

function saveShownStats(storageKey, stats) {
  setSafeStorageItem(storageKey, JSON.stringify(stats || {}));
}

function cleanImportedShownStats(stats) {
  if (!stats || typeof stats !== "object" || Array.isArray(stats)) {
    return {};
  }

  const cleaned = {};

  Object.keys(stats).forEach(function (key) {
    const id = Number(key);
    const item = stats[key] || {};

    if (!Number.isInteger(id) || !getBookById(id)) {
      return;
    }

    cleaned[String(id)] = {
      count: Math.max(0, Number(item.count) || 0),
      lastShownAt: Math.max(0, Number(item.lastShownAt) || 0)
    };
  });

  return cleaned;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
