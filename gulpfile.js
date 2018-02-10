/**
 * Created by evgen on 10.02.18.
 */
const gulp = require('gulp'),
browserSync = require("browser-sync"),
    reload = browserSync.reload;

// var path = {
//     build: { // пути куда складывать
//         html: 'build/',
//         htmlTemp : 'js/app/controllers/'
//         // css: 'build/style',
//         // js: 'build/js/',
//         // img: 'build/image',
//         // fonts: 'build/fonts/'
//     },
//     src: { // откуда брать
//         html: 'src/*.html',
//         htmlTemp : 'src/js/app/controllers/*.html'
//         // css: 'src/style/screen.scss',
//         // js: ['src/js/library/angular.min.js',
//         //     'src/js/library/angular-ui-router.js',
//         //     'src/js/scripts/*.js',
//         //     'src/partials/**/*.js'] ,
//         // img: 'src/image/*.*',
//         // fonts: 'src/fonts/**/*.*'
//     },
//     watch: { // за чем следить
//         html:  'src/*.html',
//         htmlTemp : 'src/js/app/controllers/*.html'
//         // css: 'src/style/**/*.scss',
//         // jsScripts: 'src/js/scripts/*.js',
//         // jsApps: 'src/partials/**/*.js',
//         // img: 'src/image/*.*',
//         // font: 'src/fonts/**/*.*'
//     }
//     // clean : './build'
// };

//dev сервер
var config = {
    server: {
        baseDir: ['./build']
    },
    tunnel: 'true',
    host: 'localhost',
    port: '3553'
};


gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('build/'))
        .pipe(reload({stream: true}));
});

gulp.task('htmlTemp', function () {
    gulp.src('src/js/app/controllers/*.html')
        .pipe(gulp.dest('build/js/app/controllers/'))
        .pipe(reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('build/js/'))
        .pipe(reload({stream: true}));
});


gulp.task('build', [
    'html',
    'htmlTemp',
    'js'
    // 'style',
    // 'fonts',
    // 'image'
]);

gulp.task('watch', function() {
    watch('src/js/**/*.js', function (event, cb) {
        gulp.start('js');
    });
    watch('src/js/app/controllers/*.html', function (event, cb) {
        gulp.start('htmlTemp');
    });
});

gulp.task('server', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'server', 'watch']);