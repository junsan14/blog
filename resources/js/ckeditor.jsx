
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
    ImageResizeEditing, 
    ImageResizeHandles,
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
        ImageResizeEditing,
        ImageResizeHandles,
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
     heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading2', view: 'h2', title: 'H2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'H3', class: 'ck-heading_heading3' },
        ]
    },
     image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'resizeImage',

        ],
        resizeOptions: [
        {
            name: 'resizeImage:original',
            value: null,
            label: 'Original'
        },
        {
            name: 'resizeImage:25',
            value: '25',
            label: '25%'
        },
        {
            name: 'resizeImage:50',
            value: '50',
            label: '50%'
        },
        {
            name: 'resizeImage:75',
            value: '75',
            label: '75%'
        },
        {
            name: 'resizeImage:100',
            value: '100',
            label: '100%'
        }
    ],
    },
    
    link:{
        addTargetToExternalLinks: true,
    },
    mediaEmbed: {
        previewsInData: true
    },
     ckfinder:{
        uploadUrl: `${route('ckfinder_connector')}?command=QuickUpload&type=Images&responseType=json`
    },
    codeBlock: {
        languages: [
            { language: 'plaintext', label: 'Plain text', class: '' },
            { language: 'HTML', label: 'HTML' },
            { language: 'SCSS', label: 'SCSS' },
            { language: 'CSS', label: 'CSS' },
            { language: 'JAVASCRIPT', label: 'JavaScript' },
            { language: 'GoogleAppsScript', label: 'GAS' },
            { language: 'PHP', label: 'PHP' },
            { language: 'PYTHON', label: 'python' },
            { language: 'SQL', label: 'SQL' },
            { language: 'ZSH', label: 'zsh' },
            
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



