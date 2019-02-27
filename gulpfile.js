var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var es2015Presets = require('babel-preset-es2015');


gulp.task('server',function(){
	connect.server({
        root:'dist/',
        port:3000,
        livereload:true
    })
})

// 处理错误信息，防止中断server
function handleErr(err){
    console.error(err)
    this.emit('end');
}

// watch
gulp.task('watch-html',function(){
	gulp.watch('source/*.html',function(event){
		gulp.src(event.path).on('error',handleErr) // 报错防止中断
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload()) //重新载入
		console.log("user "+event.path+" has been "+event.type+", gulp task...")
	})
})

gulp.task('watch-javascript',function(){
	gulp.watch('source/js/*.js',function(event){
		gulp.src(event.path)
		.pipe(babel({
            presets: es2015Presets
        }))   
		.on('error',handleErr) // 报错防止中断
		.pipe(gulp.dest('dist/js/'))
		.pipe(connect.reload()) //重新载入
		console.log("user "+event.path+" has been "+event.type+", gulp task...")
	})
})


gulp.task('watch-scss',function(){
	gulp.watch(['source/scss/*.scss'],function(event){
		 gulp.src(event.path)
		 .pipe(sass()).on('error',handleErr) // 报错防止中断
		 .pipe(gulp.dest('dist/css'))
		 .pipe(connect.reload()) //重新载入
			console.log("user "+event.path+" has been "+event.type+", gulp task...")
	})
})


gulp.task('default',['server','watch-html','watch-scss','watch-javascript'])