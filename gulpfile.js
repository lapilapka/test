let project_folder = 'dist';
let source_folder = 'src';

let path = {
    build: {
        html: project_folder + '/',
        css:  project_folder + '/css/',
        js:  project_folder + '/js/',
        img:  project_folder + '/img/',
        fonts:  project_folder + '/fonts/',
                
    },
    src: {
        html: source_folder + '/*.html',
        css:  source_folder + '/scss/style.scss',
        js:  source_folder + '/js/index.js',
        img:  source_folder + '/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',
        fonts:  source_folder + '/fonts/*{woff,woff2,ttf}',
                
    },
    watch: {
        html: source_folder + '/**/*.html',
        css:  source_folder + '/scss/**/*.scss',
        js:  source_folder + '/js/**/*.js',
        img:  source_folder + '/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',               
    },
    clean: './' + project_folder +'/'
}

let {src, dest} = require('gulp'),
gulp = require('gulp');
browsersync = require('browser-sync').create();
fileinclude = require('gulp-file-include');
scss = require('gulp-sass')(require ('sass'));
autoprefixer = require('gulp-autoprefixer');
babel = require('gulp-babel');

function browserSync(params) {
    browsersync.init({
        server:{
            baseDir: './' + project_folder +'/'
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 3 versions'],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function fonts() {
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}

function img() {
    return src(path.src.img)
    .pipe(dest(path.build.img))
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}

let build = gulp.series(gulp.parallel(css,html,fonts, img, js));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.js  = js;
exports.fonts  = fonts;
exports.css  = css;
exports.html  = html;
exports.buil  = build;
exports.watch  = watch;
exports.default  = watch;

