import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const refxTheme: CustomThemeConfig = {
    name: 'refx-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "255 255 255",
		"--on-success": "255 255 255",
		"--on-warning": "255 255 255",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #bababa 
		"--color-primary-50": "245 245 245", // #f5f5f5
		"--color-primary-100": "241 241 241", // #f1f1f1
		"--color-primary-200": "238 238 238", // #eeeeee
		"--color-primary-300": "227 227 227", // #e3e3e3
		"--color-primary-400": "207 207 207", // #cfcfcf
		"--color-primary-500": "186 186 186", // #bababa
		"--color-primary-600": "167 167 167", // #a7a7a7
		"--color-primary-700": "140 140 140", // #8c8c8c
		"--color-primary-800": "112 112 112", // #707070
		"--color-primary-900": "91 91 91", // #5b5b5b
		// secondary | #878787 
		"--color-secondary-50": "237 237 237", // #ededed
		"--color-secondary-100": "231 231 231", // #e7e7e7
		"--color-secondary-200": "225 225 225", // #e1e1e1
		"--color-secondary-300": "207 207 207", // #cfcfcf
		"--color-secondary-400": "171 171 171", // #ababab
		"--color-secondary-500": "135 135 135", // #878787
		"--color-secondary-600": "122 122 122", // #7a7a7a
		"--color-secondary-700": "101 101 101", // #656565
		"--color-secondary-800": "81 81 81", // #515151
		"--color-secondary-900": "66 66 66", // #424242
		// tertiary | #636363 
		"--color-tertiary-50": "232 232 232", // #e8e8e8
		"--color-tertiary-100": "224 224 224", // #e0e0e0
		"--color-tertiary-200": "216 216 216", // #d8d8d8
		"--color-tertiary-300": "193 193 193", // #c1c1c1
		"--color-tertiary-400": "146 146 146", // #929292
		"--color-tertiary-500": "99 99 99", // #636363
		"--color-tertiary-600": "89 89 89", // #595959
		"--color-tertiary-700": "74 74 74", // #4a4a4a
		"--color-tertiary-800": "59 59 59", // #3b3b3b
		"--color-tertiary-900": "49 49 49", // #313131
		// success | #708f77 
		"--color-success-50": "234 238 235", // #eaeeeb
		"--color-success-100": "226 233 228", // #e2e9e4
		"--color-success-200": "219 227 221", // #dbe3dd
		"--color-success-300": "198 210 201", // #c6d2c9
		"--color-success-400": "155 177 160", // #9bb1a0
		"--color-success-500": "112 143 119", // #708f77
		"--color-success-600": "101 129 107", // #65816b
		"--color-success-700": "84 107 89", // #546b59
		"--color-success-800": "67 86 71", // #435647
		"--color-success-900": "55 70 58", // #37463a
		// warning | #7d7645 
		"--color-warning-50": "236 234 227", // #eceae3
		"--color-warning-100": "229 228 218", // #e5e4da
		"--color-warning-200": "223 221 209", // #dfddd1
		"--color-warning-300": "203 200 181", // #cbc8b5
		"--color-warning-400": "164 159 125", // #a49f7d
		"--color-warning-500": "125 118 69", // #7d7645
		"--color-warning-600": "113 106 62", // #716a3e
		"--color-warning-700": "94 89 52", // #5e5934
		"--color-warning-800": "75 71 41", // #4b4729
		"--color-warning-900": "61 58 34", // #3d3a22
		// error | #a76c6c 
		"--color-error-50": "242 233 233", // #f2e9e9
		"--color-error-100": "237 226 226", // #ede2e2
		"--color-error-200": "233 218 218", // #e9dada
		"--color-error-300": "220 196 196", // #dcc4c4
		"--color-error-400": "193 152 152", // #c19898
		"--color-error-500": "167 108 108", // #a76c6c
		"--color-error-600": "150 97 97", // #966161
		"--color-error-700": "125 81 81", // #7d5151
		"--color-error-800": "100 65 65", // #644141
		"--color-error-900": "82 53 53", // #523535
		// surface | #2b2b2b 
		"--color-surface-50": "223 223 223", // #dfdfdf
		"--color-surface-100": "213 213 213", // #d5d5d5
		"--color-surface-200": "202 202 202", // #cacaca
		"--color-surface-300": "170 170 170", // #aaaaaa
		"--color-surface-400": "107 107 107", // #6b6b6b
		"--color-surface-500": "43 43 43", // #2b2b2b
		"--color-surface-600": "39 39 39", // #272727
		"--color-surface-700": "32 32 32", // #202020
		"--color-surface-800": "26 26 26", // #1a1a1a
		"--color-surface-900": "21 21 21", // #151515
		
	}
}