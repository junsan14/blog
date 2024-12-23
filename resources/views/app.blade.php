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
        <link rel="icon" type="svg+xml" sizes="32x32" href="{{ asset('icon.png') }}" />
    @if(isset($meta))
        @php
        
        $pattern = '/<img.*?src\s*=\s*[\"|\'](.*?)[\"|\'].*?>/i';
        preg_match( $pattern, $meta['thumbnail'], $thumbnail );
        $thumbnail_path = $thumbnail[1]?url('').$thumbnail[1]:url('').'/ogp.png' ;
        @endphp
        <title>{{ 'junsan14'.'｜'.$meta['title'] }}</title>
        <meta property="og:title" content="{{ 'junsan14'.'｜'.$meta['title'] }}"/>
        <meta property="og:description" content="{{ $meta['excerpt'] }}"/>
        <meta property="og:image" content="{{$thumbnail_path}}"/>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="{{ config('app.name', 'junsan14').'｜'.$meta['title'] }}" />
        <meta name="twitter:description" content="{{ $meta['excerpt'] }}" />
        <meta name="twitter:image" content="{{$thumbnail_path}}" />
    @else
        <title>{{ config('app.name', 'junsan14') }}</title>
        <meta property="og:description" content="元ホテルマン・Webエンジニアが、ルワンダで挑戦する社会貢献活動とスキルの記録を発信。キャリアと学びを一体化したサイト" />
        <meta property="og:title" content="junsan14|JICA海外協力隊" />
        <meta property="og:image" content="{{ asset('ogp.png') }}" />
        <meta name="twitter:card" content="summary">
        <meta name="twitter:title" content="{{ config('app.name', 'junsan14') }}">
        <meta name="twitter:description" content="元ホテルマン・Webエンジニアが、ルワンダで挑戦する社会貢献活動とスキルの記録を発信。キャリアと学びを一体化したサイト">
        <meta name="twitter:image" content="{{ asset('ogp.png') }}">
    @endif
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        
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
