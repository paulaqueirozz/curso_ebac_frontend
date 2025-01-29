/*
* Copyright (c) 2015 Amazon.com. All rights reserved. 
*/
/*
 * Rasterize.js
 *
 * Kindle software Copyright 2011-2015 Amazon.com, Inc. or its affiliates.
 * All rights reserved. Amazon, the Amazon logo, Kindle, the Kindle
 * logo, and Whispersync are trademarks of Amazon.com, Inc. or its
 * affiliates.
 */
'use strict';
var FontUtils = {};
var SERIF_TYPEFACE = 1;
var SANS_SERIF_TYPEFACE = 2;
/*
* Unicode mapping taken from
* https://code.amazon.com/packages/YJFontAccess/blobs/mainline/--/src/fontaccess/Data.cpp
*/
FontUtils['BLOCKS'] = [
    { "block_start": 0x0000, "block": "Latin" },
    { "block_start": 0x0080, "block": "Latin-1_Supplement" },
    { "block_start": 0x0100, "block": "Latin_Extended-A" },
    { "block_start": 0x0180, "block": "Latin_Extended-B" },
    { "block_start": 0x0250, "block": "IPA_Extensions" },
    { "block_start": 0x02B0, "block": "Spacing_Modifier_Letters" },
    { "block_start": 0x0300, "block": "Combining_Diacritical_Marks" },
    { "block_start": 0x0370, "block": "Greek_Coptic" },
    { "block_start": 0x0400, "block": "Cyrillic" },
    { "block_start": 0x0530, "block": "Armenian" },
    { "block_start": 0x0590, "block": "Hebrew" },
    { "block_start": 0x0600, "block": "Arabic" },
    { "block_start": 0x0700, "block": "Syriac" },
    { "block_start": 0x0750, "block": "Arabic" },
    { "block_start": 0x0780, "block": "Thaana" },
    { "block_start": 0x07C0, "block": "Nko" },
    { "block_start": 0x0800, "block": "Samaritan" },
    { "block_start": 0x0840, "block": "Mandaic" },
    { "block_start": 0x0900, "block": "Devanagari" },
    { "block_start": 0x0980, "block": "Bengali" },
    { "block_start": 0x0A00, "block": "Gurmukhi" },
    { "block_start": 0x0A80, "block": "Gujarati" },
    { "block_start": 0x0B00, "block": "Oriya" },
    { "block_start": 0x0B80, "block": "Tamil" },
    { "block_start": 0x0C00, "block": "Telugu" },
    { "block_start": 0x0C80, "block": "Kannada" },
    { "block_start": 0x0D00, "block": "Malayalam" },
    { "block_start": 0x0D80, "block": "Sinhala" },
    { "block_start": 0x0E00, "block": "Thai" },
    { "block_start": 0x0E80, "block": "Lao" },
    { "block_start": 0x0F00, "block": "Tibetan" },
    { "block_start": 0x1000, "block": "Myanmar" },
    { "block_start": 0x10A0, "block": "Georgian" },
    { "block_start": 0x1100, "block": "Hangul" },
    { "block_start": 0x1200, "block": "Ethiopic" },
    { "block_start": 0x13A0, "block": "Cherokee" },
    { "block_start": 0x1400, "block": "Canadian_Syllabics" },
    { "block_start": 0x1680, "block": "Ogham" },
    { "block_start": 0x16A0, "block": "Runic" },
    { "block_start": 0x1700, "block": "Tagalog" },
    { "block_start": 0x1720, "block": "Hanunoo" },
    { "block_start": 0x1740, "block": "Buhid" },
    { "block_start": 0x1760, "block": "Tagbanwa" },
    { "block_start": 0x1780, "block": "Khmer" },
    { "block_start": 0x1800, "block": "Mongolian" },
    { "block_start": 0x18B0, "block": "Canadian_Syllabics" },
    { "block_start": 0x1900, "block": "Limbu" },
    { "block_start": 0x1950, "block": "Tai_Le" },
    { "block_start": 0x1980, "block": "New_Tai_Lue" },
    { "block_start": 0x19E0, "block": "Khmer" },
    { "block_start": 0x1A00, "block": "Buginese" },
    { "block_start": 0x1A20, "block": "Tai_Tham" },
    { "block_start": 0x1AB0, "block": "Latin" },
    { "block_start": 0x1B00, "block": "Balinese" },
    { "block_start": 0x1B80, "block": "Sundanese" },
    { "block_start": 0x1BC0, "block": "Batak" },
    { "block_start": 0x1C00, "block": "Lepcha" },
    { "block_start": 0x1C50, "block": "Ol_Chiki" },
    { "block_start": 0x1C80, "block": "Cyrillic" },
    { "block_start": 0x1CC0, "block": "Sundanese" },
    { "block_start": 0x1CD0, "block": "Vedic" },
    { "block_start": 0x1D00, "block": "Phonetic_Extensions" },
    { "block_start": 0x1D80, "block": "Phonetic_Extensions_Supplement" },
    { "block_start": 0x1DC0, "block": "Combining_Diacritical_Marks_Supplement" },
    { "block_start": 0x1E00, "block": "Latin_Extended_Additional" },
    { "block_start": 0x1F00, "block": "Greek_Coptic" },
    { "block_start": 0x2000, "block": "Punctuation" },
    { "block_start": 0x2070, "block": "Letterlike" },
    { "block_start": 0x20D0, "block": "Combining_Diacritical_Marks_for_Symbols" },
    { "block_start": 0x2100, "block": "Letterlike" },
    { "block_start": 0x2190, "block": "Symbols" },
    { "block_start": 0x2200, "block": "Mathematical" },
    { "block_start": 0x2300, "block": "Symbols" },
    { "block_start": 0x2440, "block": "Optical_Character_Recognition" },
    { "block_start": 0x2460, "block": "Enclosed" },
    { "block_start": 0x2500, "block": "Symbols" },
    { "block_start": 0x2700, "block": "Dingbats" },
    { "block_start": 0x27C0, "block": "Mathematical" },
    { "block_start": 0x27F0, "block": "Symbols" },
    { "block_start": 0x2800, "block": "Braille_Patterns" },
    { "block_start": 0x2900, "block": "Symbols" },
    { "block_start": 0x2980, "block": "Mathematical" },
    { "block_start": 0x2B00, "block": "Symbols" },
    { "block_start": 0x2C00, "block": "Glagolitic" },
    { "block_start": 0x2C60, "block": "Latin_Extended-C" },
    { "block_start": 0x2C80, "block": "Greek_Coptic" },
    { "block_start": 0x2D00, "block": "Georgian" },
    { "block_start": 0x2D30, "block": "Tifinagh" },
    { "block_start": 0x2D80, "block": "Ethiopic" },
    { "block_start": 0x2DE0, "block": "Cyrillic" },
    { "block_start": 0x2E00, "block": "Punctuation" },
    { "block_start": 0x2E80, "block": "CJK_Radicals_Supplement" },
    { "block_start": 0x2F00, "block": "Kangxi_Radicals" },
    { "block_start": 0x2FF0, "block": "Ideographic_Description_Characters" },
    { "block_start": 0x3000, "block": "CJK_Symbols_And_Punctuation" },
    { "block_start": 0x3040, "block": "Hiragana_Katakana" },
    { "block_start": 0x3100, "block": "Bopomofo" },
    { "block_start": 0x3130, "block": "Hangul" },
    { "block_start": 0x3190, "block": "Kanbun" },
    { "block_start": 0x31A0, "block": "Bopomofo" },
    { "block_start": 0x31C0, "block": "CJK_Strokes" },
    { "block_start": 0x31F0, "block": "Hiragana_Katakana" },
    { "block_start": 0x3200, "block": "Hangul" },
    { "block_start": 0x3220, "block": "Enclosed" },
    { "block_start": 0x3260, "block": "Hangul" },
    { "block_start": 0x3280, "block": "Enclosed" },
    { "block_start": 0x3400, "block": "CJK_Ideographs_BMP" },
    { "block_start": 0x4DC0, "block": "Yijing_Hexagram_Symbols" },
    { "block_start": 0x4E00, "block": "CJK_Ideographs_BMP" },
    { "block_start": 0xA000, "block": "Yi" },
    { "block_start": 0xA4D0, "block": "Lisu" },
    { "block_start": 0xA500, "block": "Vai" },
    { "block_start": 0xA640, "block": "Cyrillic" },
    { "block_start": 0xA6A0, "block": "Bamum" },
    { "block_start": 0xA700, "block": "Modifier_Tone_Letters" },
    { "block_start": 0xA720, "block": "Latin_Extended-D" },
    { "block_start": 0xA800, "block": "Syloti_Nagri" },
    { "block_start": 0xA830, "block": "Indic_Number_Forms" },
    { "block_start": 0xA840, "block": "Phags_pa" },
    { "block_start": 0xA880, "block": "Saurashtra" },
    { "block_start": 0xA8E0, "block": "Devanagari" },
    { "block_start": 0xA900, "block": "Kayah_Li" },
    { "block_start": 0xA930, "block": "Rejang" },
    { "block_start": 0xA960, "block": "Hangul" },
    { "block_start": 0xA980, "block": "Javanese" },
    { "block_start": 0xA9E0, "block": "Myanmar" },
    { "block_start": 0xAA00, "block": "Cham" },
    { "block_start": 0xAA60, "block": "Myanmar" },
    { "block_start": 0xAA80, "block": "Tai_Viet" },
    { "block_start": 0xAAE0, "block": "Meetei_Mayek" },
    { "block_start": 0xAB00, "block": "Ethiopic" },
    { "block_start": 0xAB30, "block": "Latin" },
    { "block_start": 0xAB70, "block": "Cherokee" },
    { "block_start": 0xABC0, "block": "Meetei_Mayek" },
    { "block_start": 0xAC00, "block": "Hangul" },
    { "block_start": 0xD7B0, "block": "Hangul" },
    { "block_start": 0xE000, "block": "PUA" },
    { "block_start": 0xF900, "block": "CJK_Ideographs_BMP" },
    { "block_start": 0xFB00, "block": "Alphabetic_Presentation_Forms" },
    { "block_start": 0xFB10, "block": "Armenian" },
    { "block_start": 0xFB1D, "block": "Hebrew" },
    { "block_start": 0xFB50, "block": "Arabic" },
    { "block_start": 0xFE10, "block": "Vertical_Forms" },
    { "block_start": 0xFE20, "block": "Combining_Half_Marks" },
    { "block_start": 0xFE30, "block": "CJK_Symbols_And_Punctuation" },
    { "block_start": 0xFE70, "block": "Arabic" },
    { "block_start": 0xFF00, "block": "CJK_Symbols_And_Punctuation" },
    { "block_start": 0xFFA0, "block": "Hangul" },
    { "block_start": 0xFFE0, "block": "CJK_Symbols_And_Punctuation" },
    { "block_start": 0xFFF0, "block": "Specials" },
    { "block_start": 0x10000, "block": "Linear_B" },
    { "block_start": 0x10100, "block": "Ancient_Greek" },
    { "block_start": 0x10190, "block": "Letterlike" },
    { "block_start": 0x101D0, "block": "Phaistos_Disc" },
    { "block_start": 0x10280, "block": "Lycian" },
    { "block_start": 0x102A0, "block": "Carian" },
    { "block_start": 0x102E0, "block": "Coptic" },
    { "block_start": 0x10300, "block": "Old_Italic" },
    { "block_start": 0x10330, "block": "Gothic" },
    { "block_start": 0x10350, "block": "Old_Permic" },
    { "block_start": 0x10380, "block": "Ugaritic" },
    { "block_start": 0x103A0, "block": "Old_Persian" },
    { "block_start": 0x10400, "block": "Deseret" },
    { "block_start": 0x10450, "block": "Shavian" },
    { "block_start": 0x10480, "block": "Osmanya" },
    { "block_start": 0x10500, "block": "Elbasan" },
    { "block_start": 0x10530, "block": "Caucasian_Albanian" },
    { "block_start": 0x10600, "block": "Linear_A" },
    { "block_start": 0x10800, "block": "Cypriot_Syllabary" },
    { "block_start": 0x10840, "block": "Imperial_Aramaic" },
    { "block_start": 0x10860, "block": "Palmyrene" },
    { "block_start": 0x10880, "block": "Nabataean" },
    { "block_start": 0x108E0, "block": "Hatran" },
    { "block_start": 0x10900, "block": "Phoenician" },
    { "block_start": 0x10920, "block": "Lydian" },
    { "block_start": 0x10980, "block": "Meroitic" },
    { "block_start": 0x10A00, "block": "Kharoshthi" },
    { "block_start": 0x10A60, "block": "Old_South_Arabian" },
    { "block_start": 0x10A80, "block": "Old_North_Arabian" },
    { "block_start": 0x10AC0, "block": "Manichaean" },
    { "block_start": 0x10B00, "block": "Avestan" },
    { "block_start": 0x10B40, "block": "Inscriptional_Parthian" },
    { "block_start": 0x10B60, "block": "Inscriptional_Pahlavi" },
    { "block_start": 0x10B80, "block": "Psalter_Pahlavi" },
    { "block_start": 0x10C00, "block": "Old_Turkic" },
    { "block_start": 0x10C80, "block": "Old_Hungarian" },
    { "block_start": 0x10E60, "block": "Rumi_Numeral_Symbols" },
    { "block_start": 0x11000, "block": "Brahmi" },
    { "block_start": 0x11080, "block": "Kaithi" },
    { "block_start": 0x110D0, "block": "Sora_Sompeng" },
    { "block_start": 0x11100, "block": "Chakma" },
    { "block_start": 0x11150, "block": "Mahajani" },
    { "block_start": 0x11180, "block": "Sharada" },
    { "block_start": 0x111E0, "block": "Sinhala" },
    { "block_start": 0x11200, "block": "Khojki" },
    { "block_start": 0x11280, "block": "Multani" },
    { "block_start": 0x112B0, "block": "Khudawadi" },
    { "block_start": 0x11300, "block": "Grantha" },
    { "block_start": 0x11400, "block": "Newa" },
    { "block_start": 0x11480, "block": "Tirhuta" },
    { "block_start": 0x11580, "block": "Siddham" },
    { "block_start": 0x11600, "block": "Modi" },
    { "block_start": 0x11660, "block": "Mongolian" },
    { "block_start": 0x11680, "block": "Takri" },
    { "block_start": 0x11700, "block": "Ahom" },
    { "block_start": 0x118A0, "block": "Warang_Citi" },
    { "block_start": 0x11AC0, "block": "Pau_Cin_Hau" },
    { "block_start": 0x11C00, "block": "Bhaiksuki" },
    { "block_start": 0x11C70, "block": "Marchen" },
    { "block_start": 0x12000, "block": "Cuneiform" },
    { "block_start": 0x13000, "block": "Egyptian_Hieroglyphs" },
    { "block_start": 0x14400, "block": "Anatolian_Hieroglyphs" },
    { "block_start": 0x16800, "block": "Bamum" },
    { "block_start": 0x16A40, "block": "Mro" },
    { "block_start": 0x16AD0, "block": "Bassa_Vah" },
    { "block_start": 0x16B00, "block": "Pahawh_Hmong" },
    { "block_start": 0x16F00, "block": "Miao" },
    { "block_start": 0x17000, "block": "Tangut" },
    { "block_start": 0x1B000, "block": "Hiragana_Katakana" },
    { "block_start": 0x1BC00, "block": "Duployan" },
    { "block_start": 0x1D000, "block": "Musical" },
    { "block_start": 0x1D200, "block": "Ancient_Greek" },
    { "block_start": 0x1D300, "block": "Tai_Xuan_Jing_Symbols" },
    { "block_start": 0x1D360, "block": "Counting_Rod_Numerals" },
    { "block_start": 0x1D400, "block": "Mathematical" },
    { "block_start": 0x1D800, "block": "Sutton_SignWriting" },
    { "block_start": 0x1E000, "block": "Glagolitic" },
    { "block_start": 0x1E800, "block": "Mende_Kikakui" },
    { "block_start": 0x1E900, "block": "Adlam" },
    { "block_start": 0x1EE00, "block": "Arabic" },
    { "block_start": 0x1F000, "block": "Mahjong_Tiles" },
    { "block_start": 0x1F030, "block": "Domino_Tiles" },
    { "block_start": 0x1F0A0, "block": "Playing_Cards" },
    { "block_start": 0x1F100, "block": "Enclosed" },
    { "block_start": 0x1F300, "block": "Symbols" },
    { "block_start": 0x20000, "block": "CJK_Ideographs_SIP" },
    { "block_start": 0xF0000, "block": "PUA" },
    { "block_start": 0x110000, "block": "Invalid" }
];
/*
* We add both obfuscated and unobfuscated versions of code2000
* because KPR windows for some reason uses unobfuscated version.
* Hence to support that, both mappings are needed.
*/
FontUtils['BLOCK_TO_FONT_MAP'] = {
    "Latin": ["ccl", "ds", "bo", "ba"],
    "Latin-1_Supplement": ["ccl", "ds", "bo", "ba"],
    "Latin_Extended-A": ["ccl", "ds", "bo", "ba"],
    "Greek_Coptic": ["bo", "obs-c2000", "unobs-c2000"],
    "Cyrillic": ["ccl", "bo", "ba"],
    "Gujarati": ["sa"],
    "Malayalam": ["ml"],
    "Tamil": ["mu"],
    "CJK_Ideographs_SIP": ["tbm", "ss", "songtc", "nsk"],
    "CJK_Ideographs_BMP": ["tbm", "ss", "songtc", "nsk"],
    "Hiragana_Katakana": ["tbm", "tbg"],
    "CJK_Radicals_Supplement": ["heitc", "obs-c2000", "unobs-c2000"],
    "Kanbun": ["tbm", "tbg"],
    "Bopomofo": ["heitc"],
    "Ideographic_Description_Characters": ["ss", "stH", "heitc", "myht"],
    "Vertical_Forms": ["songtc", "tbm", "tbg"],
    "Punctuation": ["bo"],
    "Arabic": ["nn", "dm", "sk"],
    "Devanagari": ["de"],
    "Vedic": ["de"],
    "Indic_Number_Forms": ["de", "sa"],
    "Specials": ["bo"],
    "Hangul": ["nsk", "ss", "songtc", "tbm"],
    "Default": ["obs-c2000", "unobs-c2000"]
};
/**
 * Mapping for Block to Amazon fonts for PDF nodes
 */
FontUtils["BLOCK_TO_FONT_MAP_PDF"] = {
    "Latin": ["bo"],
    "Latin_Serif": ["bo"],
    "Latin_Sans-Serif": ["em"],
    "Latin-1_Supplement": ["bo"],
    "Latin_Extended-A": ["bo"],
    "Greek_Coptic": ["bo", "obs-c2000", "unobs-c2000"],
    "Cyrillic": ["bo"],
    "Gujarati": ["sa"],
    "Malayalam": ["ml"],
    "Tamil": ["mu"],
    "CJK_Ideographs_SIP": ["tbm", "ss", "songtc", "nsk"],
    "CJK_Ideographs_BMP": ["tbm", "ss", "songtc", "nsk"],
    "Hiragana_Katakana": ["tbm", "tbg"],
    "CJK_Radicals_Supplement": ["heitc", "obs-c2000", "unobs-c2000"],
    "Kanbun": ["tbm", "tbg"],
    "Bopomofo": ["heitc"],
    "Ideographic_Description_Characters": ["ss", "stH", "heitc", "myht"],
    "Vertical_Forms": ["songtc", "tbm", "tbg"],
    "Punctuation": ["bo"],
    "Arabic": ["nn", "dm", "sk"],
    "Devanagari": ["de"],
    "Vedic": ["de"],
    "Indic_Number_Forms": ["de", "sa"],
    "Specials": ["bo"],
    "Hangul": ["nsk", "ss", "songtc", "tbm"],
    "Default": ["obs-c2000", "unobs-c2000"]
};
/**
 * Font to Typeface Mapping for top System fonts
 */
FontUtils["FONT_TO_TYPEFACE_MAP"] = {
    "georgia": SERIF_TYPEFACE,
    "arial": SANS_SERIF_TYPEFACE,
    "sans-serif": SANS_SERIF_TYPEFACE,
    "calibri": SANS_SERIF_TYPEFACE,
    "helvetica neue": SANS_SERIF_TYPEFACE,
    "times new roman": SERIF_TYPEFACE,
    "serif": SERIF_TYPEFACE,
    "helvetica": SANS_SERIF_TYPEFACE,
    "baskerville": SERIF_TYPEFACE,
    "palatino": SERIF_TYPEFACE,
    "verdana": SANS_SERIF_TYPEFACE,
    "times": SERIF_TYPEFACE
};
/**
 * Font Size Fallback between System fonts and
 * corresponding ( Bookerly / Ember ) Amazon fonts.
 * Note: If a font is not present in this list, we'll use Bookerly
 * as the fallback font ( instead of Caecilia font which
 * was being used earlier ).
 *
 * Note: We arrived at these values by manually adjusting the font size
 * difference between fallback and original system font and choosing the
 * closest value such that the font size looks the same for both and no
 * major CX impact is observed. Around 15 asins per font were tested for
 * FL books with heavy text content.
 */
FontUtils["FONT_SIZE_FALLBACK_MAP"] = {
    "times new roman": 0.84,
    "times": 0.88,
    "serif": 0.86,
    "helvetica": 0.965,
    "helvetica neue": 0.965,
    "calibri": 0.89,
    "georgia": 0.91,
    "arial": 0.96,
    "sans-serif": 0.989,
    "palatino": 0.89,
    "baskerville": 0.87
};
FontUtils['MAX_CODE_POINT'] = 0X10FFFF;
FontUtils['MIN_CODE_POINT'] = 0x000000;
/* Currently phantomJS does not support when multiple font blocks are combined within a single
* text node. Hence failing those cases.
*/
FontUtils['BLOCKS_WITH_UNSUPPORTED_COMBINATIONS'] = ['Arabic', 'Devanagari', 'Bengali', 'Gurmukhi', 'Hangul', 'Malayalam', 'Musical', 'Combining_Diacritical_Marks', 'Combining_Diacritical_Marks_for_Symbols', 'Combining_Diacritical_Marks_Supplement', 'Combining_Half_Marks'];
FontUtils.getMatchingFontForGivenBlock = function (block) {
    if (FontUtils['BLOCK_TO_FONT_MAP'][block]) {
        return FontUtils['BLOCK_TO_FONT_MAP'][block];
    }
    return FontUtils['BLOCK_TO_FONT_MAP']['Default'];
};
/**
 * Function to get the matching fallback font for the PDF Node
 * @param block - Block Type of Node
 * @param primaryFont - Input Node Font Family
 */
FontUtils.getMatchingFontForGivenBlockForPDFBacked = function (block, primaryFont) {
    // Fallback to Serif based Amazon font family order if the input
    // font family has serif typeface
    if (block == "Latin" && FontUtils["FONT_TO_TYPEFACE_MAP"][primaryFont] == SERIF_TYPEFACE) {
        return FontUtils["BLOCK_TO_FONT_MAP_PDF"]["Latin_Serif"];
    }
    // Fallback to Sans Serif based Amazon font family order if the
    // input font family has Sans serif typeface
    else if (block == "Latin" && FontUtils["FONT_TO_TYPEFACE_MAP"][primaryFont] == SANS_SERIF_TYPEFACE) {
        return FontUtils["BLOCK_TO_FONT_MAP_PDF"]["Latin_Sans-Serif"];
    }
    else if (FontUtils["BLOCK_TO_FONT_MAP_PDF"][block]) {
        return FontUtils["BLOCK_TO_FONT_MAP_PDF"][block];
    }
    return FontUtils["BLOCK_TO_FONT_MAP_PDF"]['Default'];
};
FontUtils.getUnicodeBlockForCodePoint = function (codePoint) {
    if (codePoint < this['MIN_CODE_POINT'] || codePoint > this['MAX_CODE_POINT']) {
        return null;
    }
    var top = this['BLOCKS'].length, bottom = 0, current = Math.floor(top / 2);
    // invariant: top > current >= bottom && codePoint >= BLOCK_STARTS[bottom]
    while (top - bottom > 1) {
        if (codePoint >= this['BLOCKS'][current]["block_start"]) {
            bottom = current;
        }
        else {
            top = current;
        }
        current = Math.floor((top + bottom) / 2);
    }
    return this['BLOCKS'][current]["block"];
};
FontUtils.fixedCharCodeAt = function (str, idx) {
    // ex. fixedCharCodeAt('\uD800\uDC00', 0); // 65536
    // ex. fixedCharCodeAt('\uD800\uDC00', 1); // false
    idx = idx || 0;
    var code = str.charCodeAt(idx);
    var hi, low;
    // Refer https://stackoverflow.com/questions/8868432/how-are-surrogate-pairs-calculated
    // High surrogate (could change last hex to 0xDB7F
    // to treat high private surrogates
    // as single characters)
    if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = str.charCodeAt(idx + 1);
        if (isNaN(low)) {
            throw 'High surrogate not followed by ' +
                'low surrogate in fixedCharCodeAt()';
        }
        return ((hi - 0xD800) * 0x400) +
            (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
        // We return false to allow loops to skip
        // this iteration since should have already handled
        // high surrogate above in the previous iteration
        return false;
    }
    return code;
};
FontUtils.isBlockCombinationsValid = function (blocks) {
    if (blocks.length <= 1)
        return true;
    for (var i = 0; i < FontUtils['BLOCKS_WITH_UNSUPPORTED_COMBINATIONS'].length; i += 1) {
        var block = FontUtils['BLOCKS_WITH_UNSUPPORTED_COMBINATIONS'][i];
        if (blocks.indexOf(block) !== -1)
            return false;
    }
    return true;
};
