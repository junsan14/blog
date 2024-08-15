<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-57M823B');</script>
        <!-- End Google Tag Manager -->

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{{ url()->current() }}" />
        <link rel="icon" type="svg+xml" sizes="32x32" href="{{ asset('icon.png') }}"" />
        @php
        dd($page['props']);
        @endphp
        @if(isset($page['props']['post']))
            @php
                $post = $page['props']['post'];
                $pattern = '/<img.*?src\s*=\s*[\"|\'](.*?)[\"|\'].*?>/i';
                preg_match( $pattern, $post['thumbnail'], $thumbnail );
                $thumbnail_path = $thumbnail[1]?url('').$thumbnail[1]:url('').'/ogp.png' ;
            @endphp
            <title>{{ (isset($post['title'])) ? (config('app.name', 'junsan14').'｜'.$post['title']) : 'My Website | Page' }}</title>
            <meta property="og:title" content="{{ (isset($post['title'])) ? (config('app.name', 'junsan14').'｜'.$post['title']) : 'junsan14' }}"/>
            <meta property="og:description" content="{{ (isset($post['excerpt'])) ? $post['excerpt'] : '' }}"/>
            <meta property="og:image" content="{{$thumbnail_path}}"/>

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="{{ (isset($post['title'])) ? (config('app.name', 'junsan14').'｜'.$post['title']) : 'junsan14' }}" />
            <meta name="twitter:description" content="{{ (isset($post['excerpt'])) ? $post['excerpt'] : '' }}" />
            <meta name="twitter:image" content="{{$thumbnail_path}}" />
        @else
            <title>{{ config('app.name', 'junsan14') }}</title>
            <meta property="og:description" content="現:海外協力隊ルワンダ24年1次隊員,グローカルプログラム伊予市　それぞれに関わる情報を発信しています!長年未使用だった駅室の一角で伊予市ならではのお土産やJR商品を販売しています。" />
            <meta property="og:title" content="junsan14|JICA海外協力隊" />
            <meta property="og:image" content="{{ asset('ogp.png') }}" />

            <meta name="twitter:card" content="summary">
            <meta name="twitter:title" content="{{ config('app.name', 'junsan14') }}">
            <meta name="twitter:description" content="現:海外協力隊ルワンダ24年1次隊員,グローカルプログラム伊予市　それぞれに関わる情報を発信しています!長年未使用だった駅室の一角で伊予市ならではのお土産やJR商品を販売しています。">
            <meta name="twitter:image" content="{{ asset('ogp.png') }}">
        @endif
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <script type="text/javascript" src="/js/ckfinder/ckfinder.js"></script>
        <script>CKFinder.config( { connectorPath: '/ckfinder/connector' } );</script>
        
        <!-- Scripts -->
        @include('ckfinder::setup')
        @vite(['resources/css/style.scss'])

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body>
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-57M823B"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->       
        @inertia
    </body>
</html>
