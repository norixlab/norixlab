const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const include = require('gulp-include');
// const htmlmin = require('gulp-htmlmin');
const svgSprite = require('gulp-svg-sprite');

// function pages(){
//     return src('app/pages/*.html')
//     .pipe(include({
//         includePath: 'app/components'
//     }))
//     .pipe(dest('app'))
//     .pipe(browserSync.stream())
// }
function fonts(){
    return src('app/fonts/src/*.*')
    .pipe(fonter({
        formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
}
function imagesAvif(){
    return src(['app/images/src/*.*', '!app/images/src/*.gif'])
    .pipe(newer('app/images'))
    .pipe(avif({quality: 50}))
    .pipe(dest('app/images'))
}
function imagesWebp(){
    return src('app/images/slider/src/*.*')
    .pipe(newer('app/images/slider'))
    .pipe(webp())
    .pipe(dest('app/images/slider'))
}
function imagesMin(){
    return src(['app/images/src/*.*', 'app/images/icons/*.*'])
    .pipe(newer('app/images'))
    .pipe(imagemin())
    .pipe(dest('app/images'))

}

function sprite(){
    return src('app/images/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg',
                example: true
            }
        }
    }))
    .pipe(dest('app/images/icons'))
}

function styles(){
    return src('app/scss/*.scss')
    .pipe(autoprefixer({overrideBrowserslist: ['last 5 versions']}))
    .pipe(concat('style.min.css'))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}


function scripts(){
    return src('app/js/script.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}
// function htmlMinify() {
//     return src('app/pages/*.html')
//       .pipe(htmlmin({
//         collapseWhitespace: true
//       }))
//       .pipe(dest('app'))
//       .pipe(browserSync.stream())
//   }

function watching(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch(['app/scss/*.scss'], styles)
    watch(['app/js/script.js'], scripts)
    watch(['app/images/src'], images)
    watch(['app/*.html']).on('change', browserSync.reload)

}


function cleanDist(){
    return src('dist')
    .pipe(clean())
}
function building(){
    return src([
        'app/css/style.min.css',
        'app/js/script.min.js',
        'app/js/libs/swiper-bundle.min.js',
        'app/js/libs/swiper-bundle.min.js.map',
        'app/fonts/*.*',
        '!app/images/*.avif',
        '!app/images/*.png',
        'app/images/*.*',
        'app/images/slider/*.*',

        // 'app/images/icons/*.*',
        // 'app/images/*.svg',
        'app/*.php',
        'app/*.html',
        'app/video/*.*'
        
    ], {base: 'app'})
    .pipe(dest('dist'))
}


exports.styles = styles;
exports.scripts = scripts;
exports.imagesAvif = imagesAvif;
exports.imagesWebp = imagesWebp;
exports.imagesMin = imagesMin;
exports.sprite = sprite;
exports.fonts = fonts;
// exports.htmlMinify = htmlMinify;
exports.watching = watching;


exports.build = series(cleanDist, building); 
exports.default = parallel(styles, scripts);