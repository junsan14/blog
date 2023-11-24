
// NOTE: Use the editor from source (not a build)!
import { Autosave } from '@ckeditor/ckeditor5-autosave';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontColor } from '@ckeditor/ckeditor5-font';
import { FontSize } from '@ckeditor/ckeditor5-font';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { UploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';

import {
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    PictureEditing,
    
    ImageResize,
} from '@ckeditor/ckeditor5-image';

export const editorConfiguration = {
    plugins: [
        Essentials,
        Autoformat,
        Bold,
        Italic,
        BlockQuote,
        Heading,
        Link,
        List,
        Paragraph,
        CodeBlock,
        CKFinder,
        FontColor,
        FontSize,
        ImageUpload,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        PictureEditing,
        ImageResize,
        UploadAdapter,
        Table,
        TableToolbar,
        TextTransformation,
        Indent,
        MediaEmbed,
        Autosave,
        Highlight,
        SourceEditing
     ],
    toolbar: [
        'heading',
        'bold',
        'italic',
        '|',
        'fontColor',
        'fontSize',
        'highlight',
        '|',
        'outdent',
        'indent',
        '|',
        'link',
        'bulletedList',
        'numberedList',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'codeBlock',
        'imageUpload',
        'CKFinder',
        'sourceEditing',
        'undo',
        'redo',


     ],
     image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side'
        ]
    },
    mediaEmbed: {
        previewsInData: true
    },
     ckfinder:{
        uploadUrl: `${route('ckfinder_connector')}?command=QuickUpload&type=Images&responseType=json`
    },
    codeBlock: {
        languages: [
            { language: 'html', label: 'HTML' },
            { language: 'css', label: 'CSS' },
            { language: 'javaScript', label: 'JavaScript' },
            { language: 'php', label: 'PHP' },
            
        ]
    }

    
    
};

export const editorConfigurationThumbnail = {
    plugins: [
        ImageUpload,
        Image,
        UploadAdapter,
        CKFinder,
        Link,
     ],
    toolbar: [
        'imageUpload',
        'CKFinder',
     ],

     ckfinder:{
        uploadUrl: `${route('ckfinder_connector')}?command=QuickUpload&type=Images&responseType=json`
    },

    
    
};



