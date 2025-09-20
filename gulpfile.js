import gulp from "gulp";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import uglify from "gulp-uglify";

export const minifyCss = () => {
  return gulp
    .src("src/css/*.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"));
};

export const minifyJsUi = () => {
  return gulp
    .src("src/ui/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/ui"));
};

export const minifyJsApi = () => {
  return gulp
    .src("src/api/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/api"));
};

export const minifyJsScript = () => {
  return gulp
    .src("src/script.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/"));
};

gulp.task("minify-css", minifyCss);
gulp.task("minify-js-ui", minifyJsUi);
gulp.task("minify-js-api", minifyJsApi);
gulp.task("minify-js-script", minifyJsScript);

export default gulp.parallel(minifyCss, minifyJsUi, minifyJsApi, minifyJsScript);
