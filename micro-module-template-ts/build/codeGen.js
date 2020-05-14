"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jscodeshift_1 = __importDefault(require("jscodeshift"));
var fs_1 = __importDefault(require("fs"));
function fetchModuleVersion(name) {
    var modulePackagePath = process.cwd() + "/node_modules/" + name + "/package.json";
    if (!fs_1.default.existsSync(modulePackagePath)) {
        throw new Error(modulePackagePath + "\u4E0D\u5B58\u5728");
    }
    var packageInfo = require(modulePackagePath); // eslint-disable-line
    return packageInfo.version;
}
function default_1(_a) {
    var _b = (_a === void 0 ? {} : _a).ext, ext = _b === void 0 ? 'js' : _b;
    var cwd = process.cwd();
    var bostonDependencies = require(cwd + "/package.json").bostonDependencies;
    if (bostonDependencies) {
        if (bostonDependencies.js && bostonDependencies.js.length > 0) {
            // index.json
            var indexJson_1 = {};
            // 源代码文件
            var root = jscodeshift_1.default('');
            var body_1 = root.get().value.program.body;
            // 生成导入模块语句
            bostonDependencies.js.forEach(function (d, i) {
                var exportsIdentifier = 'exportsAlias' + i;
                indexJson_1[d] = {
                    exportName: exportsIdentifier,
                    version: fetchModuleVersion(d)
                };
                body_1.push(jscodeshift_1.default.importDeclaration([jscodeshift_1.default.importNamespaceSpecifier(jscodeshift_1.default.identifier(exportsIdentifier))], jscodeshift_1.default.literal(d)));
            });
            // 生成导入css语句
            if (bostonDependencies.css && bostonDependencies.css.length > 0) {
                bostonDependencies.css.forEach(function (s) {
                    body_1.push(jscodeshift_1.default.importDeclaration([], jscodeshift_1.default.literal(s)));
                });
            }
            // 生成exports语句
            body_1.push(jscodeshift_1.default.exportNamedDeclaration(null, Object.values(indexJson_1).map(function (a) { return jscodeshift_1.default.exportSpecifier(jscodeshift_1.default.identifier(a.exportName), jscodeshift_1.default.identifier(a.exportName)); })));
            fs_1.default.writeFileSync(cwd + "/src/index." + ext, root.toSource({ quote: 'single' }), {
                flag: 'w'
            });
            if (!fs_1.default.existsSync(cwd + "/static")) {
                fs_1.default.mkdirSync(cwd + "/static");
            }
            fs_1.default.writeFileSync(cwd + "/static/index.json", JSON.stringify(indexJson_1), {
                flag: 'w'
            });
        }
        else {
            throw new Error('bostonDependencies缺少js模块配置');
        }
    }
    else {
        throw new Error('package.json中缺少bostonDependencies配置');
    }
}
exports.default = default_1;
default_1({
  ext: 'ts'
});
//# sourceMappingURL=index.js.map
