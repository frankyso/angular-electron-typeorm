import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
	declarations: [],
	imports: [
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient],
			}
		})
	],
	exports: [
		TranslateModule
	],
})
export class TranslateModuleRoot { }

@NgModule({
	declarations: [],
	imports: [
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient],
			}
		})
	],
	exports: [
		TranslateModule
	],
})
export class TranslateModuleChild { }