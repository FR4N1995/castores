/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/menuHamburguesa.js":
/*!***********************************!*\
  !*** ./src/js/menuHamburguesa.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function() {\r\n    const menuToggle = document.getElementById(\"menu-toggle\");\r\n    const mobileMenu = document.getElementById(\"mobile-menu\");\r\n\r\n    if (menuToggle && mobileMenu) {\r\n        menuToggle.addEventListener(\"click\", function(e) {\r\n            e.stopPropagation();\r\n            console.log('click')\r\n            // Alternar visibilidad\r\n            mobileMenu.classList.toggle(\"hidden\");\r\n            \r\n            // Cambiar ícono \r\n            const icon = menuToggle.querySelector('i'); \r\n            icon.classList.toggle(\"fa-bars\");\r\n            icon.classList.toggle(\"fa-times\");\r\n            \r\n            // Bloquear scroll del body cuando el menú está abierto\r\n            document.body.classList.toggle(\"overflow-hidden\");\r\n        });\r\n\r\n        // Cerrar menú al hacer click en cualquier enlace\r\n        mobileMenu.querySelectorAll('a').forEach(link => {\r\n            link.addEventListener('click', () => {\r\n                mobileMenu.classList.add(\"hidden\");\r\n                menuToggle.querySelector('i').classList.add(\"fa-bars\");\r\n                menuToggle.querySelector('i').classList.remove(\"fa-times\");\r\n                document.body.classList.remove(\"overflow-hidden\");\r\n            });\r\n        });\r\n    }\r\n});\n\n//# sourceURL=webpack://castores/./src/js/menuHamburguesa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/menuHamburguesa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;