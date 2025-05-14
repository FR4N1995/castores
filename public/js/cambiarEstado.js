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

/***/ "./src/js/cambiarEstado.js":
/*!*********************************!*\
  !*** ./src/js/cambiarEstado.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n    // Aplicar estado guardado al cargar la página\r\n    document.querySelectorAll('.cambiar-estado').forEach(boton => {\r\n        const productoId = boton.dataset.productoId;\r\n        const estadoGuardado = localStorage.getItem(`producto-${productoId}-estado`);\r\n        \r\n        if (estadoGuardado === 'false') {\r\n            const productoItem = boton.closest('.opciones');\r\n            productoItem.querySelector('.entrada')?.classList.add('hidden');\r\n            productoItem.querySelector('.salida')?.classList.add('hidden');\r\n        }\r\n    });\r\n\r\n    // Manejador del botón\r\n    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado');\r\n    cambiarEstadoBotones.forEach(boton => {\r\n        boton.addEventListener('click', cambiarEstadoPropiedad);\r\n    });\r\n\r\n    async function cambiarEstadoPropiedad(e) {\r\n        const id = e.target.dataset.productoId;\r\n        const productoItem = e.target.closest('.opciones');\r\n        const entradaBtn = productoItem.querySelector('.entrada');\r\n        const salidaBtn = productoItem.querySelector('.salida');\r\n\r\n        // Cambiar estado visual\r\n        if (e.target.classList.contains('bg-yellow-100')) {\r\n            e.target.classList.replace('bg-yellow-100', 'bg-green-100');\r\n            e.target.classList.replace('text-yellow-800', 'text-green-800');\r\n            e.target.textContent = 'Alta';\r\n            entradaBtn?.classList.remove('hidden');\r\n            salidaBtn?.classList.remove('hidden');\r\n            localStorage.setItem(`producto-${id}-estado`, 'true');\r\n        } else {\r\n            e.target.classList.replace('bg-green-100', 'bg-yellow-100');\r\n            e.target.classList.replace('text-green-800', 'text-yellow-800');\r\n            e.target.textContent = 'Baja';\r\n            entradaBtn?.classList.add('hidden');\r\n            salidaBtn?.classList.add('hidden');\r\n            localStorage.setItem(`producto-${id}-estado`, 'false');\r\n        }\r\n\r\n        //Actualizar en base de datos\r\n        try {\r\n            await fetch(`/administrador/estado/${id}`, { method: 'PUT' });\r\n         } catch (error) {\r\n             console.error(\"Error al actualizar estado\", error);\r\n         }\r\n    }\r\n})();\n\n//# sourceURL=webpack://castores/./src/js/cambiarEstado.js?");

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
/******/ 	__webpack_modules__["./src/js/cambiarEstado.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;