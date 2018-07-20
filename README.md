Vite WordPress Starter kit
===
Forked from `'_s'`, modified for speed and rapid deployment.

This pipeline uses WordPress as a CMS, SASS for styling, and jQuery as a JavaScript library. Please refer to their own documentation and/or repo for help:

- [WordPress](https://wordpress.org/).
- [Sass](https://sass-lang.com/).
- [jQuery](https://jquery.com/).

### Usage

To Setup the project you will need to do the following:

```sh
$ git clone https://github.com/amamel/wp-vite.git
$ cd wp-vite-theme
$ npm install --save-dev
$ gulp watch
```

this will bring down all the needed build tools
1. type: **gulp** this will build all the sass, fonts, and javascript files in ./static-html-templates/assets, it will also copy the assets folder to the wordpress template assets folder


## Why Vite?
> "Less is more" - Dieter Rams

Ultra-minimal CSS that has just enough styling to get you started. Less to get in your way when designing new themes. Here are some of the other more interesting things you'll find here:

## Seperation of Concerns

### Rationale
Content and presentation are separate. There should be no formatting and styling within the CMS, all is prepared to work together.

### Sass Structure
- Smartly organized Sass (SCSS) with a strong focus on performance, scalability, and a small footprint to quickly get your design off the ground.

### JavaScript
- Gulpjs streaming build system for helpful automation of time-consuming tasks in your development workflow.
- Beautiful search baked in.

### Theme
- A just right amount of lean, well-commented, modern, HTML5 templates.
- A helpful 404 template.
- A custom header implementation in `inc/custom-header.php` just add the code snippet found in the comments of `inc/custom-header.php` to your `header.php` template.
- Custom template tags in `inc/template-tags.php` that keep your templates clean and neat and prevent code duplication.
- Some small tweaks in `inc/template-functions.php` that can improve your theming experience.

## Shortcomings

**Vite** being a young project, some elements can still be buggy or lack optimizations.

- Optimize to handle heavy load
- WCAG AA Optimized
- Optimize content delivery
- Multilingual ready
- Bundle environment plugin
- Bundle maintenance plugin

## References + Links
- Based on Underscores https://underscores.me/, (C) 2012-2017 Automattic, Inc., [GPLv2 or later](https://www.gnu.org/licenses/gpl-2.0.html)
- normalize.css https://necolas.github.io/normalize.css/, (C) 2012-2016 Nicolas Gallagher and Jonathan Neal, [MIT](https://opensource.org/licenses/MIT)

#### Licensed under GPLv2 or later. :) Hack, build discover