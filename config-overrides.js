const path = require('path');
const fs = require('fs');
const workspace = path.resolve(process.cwd(), '..', '..');
const nodeModules = path.resolve(workspace, 'node_modules');
const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), { encoding: 'utf-8' }));
const packageName = packageJson.name;
const moduleCode = packageJson.moduleCode || packageJson.name;
const build = 'bundler' === packageName ? path.resolve(workspace, 'build') : path.resolve(workspace, 'dist'); // path.resolve(process.cwd(), 'build');
const buildTargets = [
    /klago-ui.*/,
    /luna-orbit/,
    /klago-codepicker/
]
const dependencies = fs.readdirSync(path.resolve(nodeModules))
    .filter(key => buildTargets.find(target => key.match(target)))
    .map(package => path.resolve(nodeModules, package))
    .map(package => {
        if (fs.lstatSync(package).isSymbolicLink()) {
            return fs.realpathSync(package);
        }
        return package;
    });

const getBabelLoader = (config, isOutsideOfApp) => {
    let babelLoaderFilter;
    if (isOutsideOfApp) {
        babelLoaderFilter = rule =>
            rule.loader && rule.loader.includes("babel") && rule.exclude;
    } else {
        babelLoaderFilter = rule =>
            rule.loader && rule.loader.includes("babel") && rule.include;
    }

    // First, try to find the babel loader inside the oneOf array.
    // This is where we can find it when working with react-scripts@2.0.3.
    let loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf))
        .oneOf;

    let babelLoader = loaders.find(babelLoaderFilter);

    // If the loader was not found, try to find it inside of the "use" array, within the rules.
    // This should work when dealing with react-scripts@2.0.0.next.* versions.
    if (!babelLoader) {
        loaders = loaders.reduce((ldrs, rule) => ldrs.concat(rule.use || []), []);
        babelLoader = loaders.find(babelLoaderFilter);
    }
    return babelLoader;
};

module.exports = {
    webpack: (config, env) => {
        // Html Webpack Plugin 제거
        config.plugins.splice(0, 1);

        //url-loader 커스터마이징 static/media에 들어갈 정적자원 용량 제한 해제
        config.module.rules = config.module.rules.map(rule => {
            if (rule.oneOf) {
                rule.oneOf.map(oneOfRule => {
                    if (
                        oneOfRule.loader &&
                        oneOfRule.loader.indexOf('url-loader') !== -1
                    ) {
                        oneOfRule.test = /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/;
                        oneOfRule.options.limit = 0;
                        oneOfRule.options.name = 'static/media/[name].[hash:8].[ext]';
                        //마이크로 프론트엔드 개발환경 사용시 이미지 불러오지 못하는 문제 해결 관련 코드
                        oneOfRule.options.esModule = false;
                    }
                });
            }
            return rule;
        });

        // Babel 빌드 추가
        const rule = config.module.rules.find(rule => rule.oneOf);
        if (rule) {
            const babelLoader = getBabelLoader(config, false);
            babelLoader.include = [babelLoader.include].concat(dependencies);

            // 외부 바벨 Exclude 설정
            const outsideOfAppBabelLoader = getBabelLoader(config, true);
            outsideOfAppBabelLoader.exclude = [outsideOfAppBabelLoader.exclude].concat(dependencies);
        }

        return config;
    },
    devServer: function (configFunction) {
        // Return the replacement function for create-react-app to use to generate the Webpack
        // Development Server config. "configFunction" is the function that would normally have
        // been used to generate the Webpack Development server config - you can use it to create
        // a starting configuration to then modify instead of having to create a config from scratch.
        return function (proxy, allowedHost) {
            // Create the default config by calling configFunction with the proxy/allowedHost parameters
            const config = configFunction(proxy, allowedHost);

            // config.contentBase = paths.build;
            config.contentBase = build;
            config.contentBasePublicPath = '/';
            config.watchOptions = {
                ...config.watchOptions || {},
                ignored: /node_modules([\\]+|\/)+(?!klago-.*|luna-orbit)/
            };

            // Return your customised Webpack Development Server config.
            return config;
        };
    },
    paths: (config, env) => {
        config.appBuild = path.resolve(build, 'modules', moduleCode);
        return config;
    }
}