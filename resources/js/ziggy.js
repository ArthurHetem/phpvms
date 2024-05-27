const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"debugbar.openhandler":{"uri":"_debugbar\/open","methods":["GET","HEAD"]},"debugbar.clockwork":{"uri":"_debugbar\/clockwork\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"debugbar.assets.css":{"uri":"_debugbar\/assets\/stylesheets","methods":["GET","HEAD"]},"debugbar.assets.js":{"uri":"_debugbar\/assets\/javascript","methods":["GET","HEAD"]},"debugbar.cache.delete":{"uri":"_debugbar\/cache\/{key}\/{tags?}","methods":["DELETE"],"parameters":["key","tags"]},"filament.admin.auth.login":{"uri":"admin\/login","methods":["GET","HEAD"]},"filament.admin.auth.logout":{"uri":"admin\/logout","methods":["POST"]},"filament.admin.pages.dashboard":{"uri":"admin","methods":["GET","HEAD"]},"filament.admin.pages.finances":{"uri":"admin\/finances","methods":["GET","HEAD"]},"filament.admin.pages.maintenance":{"uri":"admin\/maintenance","methods":["GET","HEAD"]},"filament.admin.pages.settings":{"uri":"admin\/settings","methods":["GET","HEAD"]},"filament.admin.resources.aircraft.index":{"uri":"admin\/aircraft","methods":["GET","HEAD"]},"filament.admin.resources.aircraft.create":{"uri":"admin\/aircraft\/create","methods":["GET","HEAD"]},"filament.admin.resources.aircraft.edit":{"uri":"admin\/aircraft\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.airlines.index":{"uri":"admin\/airlines","methods":["GET","HEAD"]},"filament.admin.resources.airlines.create":{"uri":"admin\/airlines\/create","methods":["GET","HEAD"]},"filament.admin.resources.airlines.edit":{"uri":"admin\/airlines\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.airports.index":{"uri":"admin\/airports","methods":["GET","HEAD"]},"filament.admin.resources.airports.create":{"uri":"admin\/airports\/create","methods":["GET","HEAD"]},"filament.admin.resources.airports.edit":{"uri":"admin\/airports\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.awards.index":{"uri":"admin\/awards","methods":["GET","HEAD"]},"filament.admin.resources.awards.create":{"uri":"admin\/awards\/create","methods":["GET","HEAD"]},"filament.admin.resources.awards.edit":{"uri":"admin\/awards\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.expenses.index":{"uri":"admin\/expenses","methods":["GET","HEAD"]},"filament.admin.resources.fares.index":{"uri":"admin\/fares","methods":["GET","HEAD"]},"filament.admin.resources.fares.create":{"uri":"admin\/fares\/create","methods":["GET","HEAD"]},"filament.admin.resources.fares.edit":{"uri":"admin\/fares\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.flights.index":{"uri":"admin\/flights","methods":["GET","HEAD"]},"filament.admin.resources.flights.create":{"uri":"admin\/flights\/create","methods":["GET","HEAD"]},"filament.admin.resources.flights.edit":{"uri":"admin\/flights\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.modules.index":{"uri":"admin\/modules","methods":["GET","HEAD"]},"filament.admin.resources.pages.index":{"uri":"admin\/pages","methods":["GET","HEAD"]},"filament.admin.resources.pages.create":{"uri":"admin\/pages\/create","methods":["GET","HEAD"]},"filament.admin.resources.pages.edit":{"uri":"admin\/pages\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.pirep-fields.index":{"uri":"admin\/pirep-fields","methods":["GET","HEAD"]},"filament.admin.resources.pireps.index":{"uri":"admin\/pireps","methods":["GET","HEAD"]},"filament.admin.resources.pireps.edit":{"uri":"admin\/pireps\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.ranks.index":{"uri":"admin\/ranks","methods":["GET","HEAD"]},"filament.admin.resources.ranks.create":{"uri":"admin\/ranks\/create","methods":["GET","HEAD"]},"filament.admin.resources.ranks.edit":{"uri":"admin\/ranks\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.subfleets.index":{"uri":"admin\/subfleets","methods":["GET","HEAD"]},"filament.admin.resources.subfleets.create":{"uri":"admin\/subfleets\/create","methods":["GET","HEAD"]},"filament.admin.resources.subfleets.edit":{"uri":"admin\/subfleets\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.typeratings.index":{"uri":"admin\/typeratings","methods":["GET","HEAD"]},"filament.admin.resources.typeratings.create":{"uri":"admin\/typeratings\/create","methods":["GET","HEAD"]},"filament.admin.resources.typeratings.edit":{"uri":"admin\/typeratings\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.user-fields.index":{"uri":"admin\/user-fields","methods":["GET","HEAD"]},"filament.admin.resources.users.index":{"uri":"admin\/users","methods":["GET","HEAD"]},"filament.admin.resources.users.edit":{"uri":"admin\/users\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.shield.roles.index":{"uri":"admin\/shield\/roles","methods":["GET","HEAD"]},"filament.admin.resources.shield.roles.create":{"uri":"admin\/shield\/roles\/create","methods":["GET","HEAD"]},"filament.admin.resources.shield.roles.view":{"uri":"admin\/shield\/roles\/{record}","methods":["GET","HEAD"],"parameters":["record"]},"filament.admin.resources.shield.roles.edit":{"uri":"admin\/shield\/roles\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"livewire.update":{"uri":"livewire\/update","methods":["POST"]},"livewire.upload-file":{"uri":"livewire\/upload-file","methods":["POST"]},"livewire.preview-file":{"uri":"livewire\/preview-file\/{filename}","methods":["GET","HEAD"],"parameters":["filename"]},"sample.":{"uri":"api\/sample\/hello","methods":["GET","HEAD"]},"ignition.healthCheck":{"uri":"_ignition\/health-check","methods":["GET","HEAD"]},"ignition.executeSolution":{"uri":"_ignition\/execute-solution","methods":["POST"]},"ignition.updateConfig":{"uri":"_ignition\/update-config","methods":["POST"]},"frontend.dashboard.index":{"uri":"dashboard","methods":["GET","HEAD"]},"frontend.dashboard.create":{"uri":"dashboard\/create","methods":["GET","HEAD"]},"frontend.dashboard.store":{"uri":"dashboard","methods":["POST"]},"frontend.dashboard.show":{"uri":"dashboard\/{dashboard}","methods":["GET","HEAD"],"parameters":["dashboard"]},"frontend.dashboard.edit":{"uri":"dashboard\/{dashboard}\/edit","methods":["GET","HEAD"],"parameters":["dashboard"]},"frontend.dashboard.update":{"uri":"dashboard\/{dashboard}","methods":["PUT","PATCH"],"parameters":["dashboard"]},"frontend.dashboard.destroy":{"uri":"dashboard\/{dashboard}","methods":["DELETE"],"parameters":["dashboard"]},"frontend.airports.show":{"uri":"airports\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"frontend.downloads.index":{"uri":"downloads","methods":["GET","HEAD"]},"frontend.downloads.download":{"uri":"downloads\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"frontend.flights.bids":{"uri":"flights\/bids","methods":["GET","HEAD"]},"frontend.flights.search":{"uri":"flights\/search","methods":["GET","HEAD"]},"frontend.flights.index":{"uri":"flights","methods":["GET","HEAD"]},"frontend.flights.create":{"uri":"flights\/create","methods":["GET","HEAD"]},"frontend.flights.store":{"uri":"flights","methods":["POST"]},"frontend.flights.show":{"uri":"flights\/{flight}","methods":["GET","HEAD"],"parameters":["flight"]},"frontend.flights.edit":{"uri":"flights\/{flight}\/edit","methods":["GET","HEAD"],"parameters":["flight"]},"frontend.flights.update":{"uri":"flights\/{flight}","methods":["PUT","PATCH"],"parameters":["flight"]},"frontend.flights.destroy":{"uri":"flights\/{flight}","methods":["DELETE"],"parameters":["flight"]},"frontend.":{"uri":"pireps\/fares","methods":["GET","HEAD"]},"frontend.pireps.submit":{"uri":"pireps\/{id}\/submit","methods":["POST"],"parameters":["id"]},"frontend.pireps.index":{"uri":"pireps","methods":["GET","HEAD"]},"frontend.pireps.create":{"uri":"pireps\/create","methods":["GET","HEAD"]},"frontend.pireps.store":{"uri":"pireps","methods":["POST"]},"frontend.pireps.edit":{"uri":"pireps\/{pirep}\/edit","methods":["GET","HEAD"],"parameters":["pirep"]},"frontend.pireps.update":{"uri":"pireps\/{pirep}","methods":["PUT","PATCH"],"parameters":["pirep"]},"frontend.pireps.destroy":{"uri":"pireps\/{pirep}","methods":["DELETE"],"parameters":["pirep"]},"frontend.profile.acars":{"uri":"profile\/acars","methods":["GET","HEAD"]},"frontend.profile.regen_apikey":{"uri":"profile\/regen_apikey","methods":["GET","HEAD"]},"frontend.profile.index":{"uri":"profile","methods":["GET","HEAD"]},"frontend.profile.create":{"uri":"profile\/create","methods":["GET","HEAD"]},"frontend.profile.store":{"uri":"profile","methods":["POST"]},"frontend.profile.show":{"uri":"profile\/{profile}","methods":["GET","HEAD"],"parameters":["profile"]},"frontend.profile.edit":{"uri":"profile\/{profile}\/edit","methods":["GET","HEAD"],"parameters":["profile"]},"frontend.profile.update":{"uri":"profile\/{profile}","methods":["PUT","PATCH"],"parameters":["profile"]},"frontend.profile.destroy":{"uri":"profile\/{profile}","methods":["DELETE"],"parameters":["profile"]},"frontend.simbrief.generate":{"uri":"simbrief\/generate","methods":["GET","HEAD"]},"frontend.simbrief.api_code":{"uri":"simbrief\/apicode","methods":["POST"]},"frontend.simbrief.check_ofp":{"uri":"simbrief\/check_ofp","methods":["GET","HEAD"]},"frontend.simbrief.update_ofp":{"uri":"simbrief\/update_ofp","methods":["GET","HEAD"]},"frontend.simbrief.briefing":{"uri":"simbrief\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"frontend.simbrief.prefile":{"uri":"simbrief\/{id}\/prefile","methods":["GET","HEAD"],"parameters":["id"]},"frontend.simbrief.cancel":{"uri":"simbrief\/{id}\/cancel","methods":["GET","HEAD"],"parameters":["id"]},"frontend.simbrief.generate_new":{"uri":"simbrief\/{id}\/generate_new","methods":["GET","HEAD"],"parameters":["id"]},"frontend.home":{"uri":"\/","methods":["GET","HEAD"]},"frontend.pirep.show.public":{"uri":"r\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"frontend.pireps.show":{"uri":"pireps\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"frontend.users.show.public":{"uri":"users\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"frontend.pilots.show.public":{"uri":"pilots\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"frontend.pages.show":{"uri":"page\/{slug}","methods":["GET","HEAD"],"parameters":["slug"]},"frontend.profile.show.public":{"uri":"profile\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"frontend.users.index":{"uri":"users","methods":["GET","HEAD"]},"frontend.pilots.index":{"uri":"pilots","methods":["GET","HEAD"]},"frontend.livemap.index":{"uri":"livemap","methods":["GET","HEAD"]},"frontend.lang.switch":{"uri":"lang\/{lang}","methods":["GET","HEAD"],"parameters":["lang"]},"auth.logout":{"uri":"logout","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"logout":{"uri":"logout","methods":["POST"]},"register":{"uri":"register","methods":["GET","HEAD"]},"password.request":{"uri":"password\/reset","methods":["GET","HEAD"]},"password.email":{"uri":"password\/email","methods":["POST"]},"password.reset":{"uri":"password\/reset\/{token}","methods":["GET","HEAD"],"parameters":["token"]},"password.update":{"uri":"password\/reset","methods":["POST"]},"verification.notice":{"uri":"email\/verify","methods":["GET","HEAD"]},"verification.verify":{"uri":"email\/verify\/{id}\/{hash}","methods":["GET","HEAD"],"parameters":["id","hash"]},"verification.resend":{"uri":"email\/resend","methods":["POST"]},"api.":{"uri":"api\/users\/{id}\/bids","methods":["PUT"],"parameters":["id"]},"api.maintenance.cron":{"uri":"api\/cron\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"api.flights.briefing":{"uri":"api\/flights\/{id}\/briefing","methods":["GET","HEAD"],"parameters":["id"]},"importer.index":{"uri":"importer","methods":["GET","HEAD"]},"importer.config":{"uri":"importer\/config","methods":["POST"]},"importer.dbtest":{"uri":"importer\/dbtest","methods":["POST"]},"importer.run":{"uri":"importer\/run","methods":["POST"]},"importer.complete":{"uri":"importer\/complete","methods":["POST"]},"installer.index":{"uri":"install","methods":["GET","HEAD"]},"installer.dbtest":{"uri":"install\/dbtest","methods":["POST"]},"installer.step1":{"uri":"install\/step1","methods":["GET","HEAD"]},"installer.step1post":{"uri":"install\/step1","methods":["POST"]},"installer.step2":{"uri":"install\/step2","methods":["GET","HEAD"]},"installer.envsetup":{"uri":"install\/envsetup","methods":["POST"]},"installer.dbsetup":{"uri":"install\/dbsetup","methods":["GET","HEAD"]},"installer.step3":{"uri":"install\/step3","methods":["GET","HEAD"]},"installer.usersetup":{"uri":"install\/usersetup","methods":["POST"]},"installer.complete":{"uri":"install\/complete","methods":["GET","HEAD"]},"update.index":{"uri":"update","methods":["GET","HEAD"]},"update.step1":{"uri":"update\/step1","methods":["GET","HEAD"]},"update.step1post":{"uri":"update\/step1","methods":["POST"]},"update.run_migrations":{"uri":"update\/run-migrations","methods":["POST"]},"update.complete":{"uri":"update\/complete","methods":["GET","HEAD"]},"nscore.career":{"uri":"crew\/career","methods":["GET","HEAD"]},"nscore.airports.index":{"uri":"crew\/airports","methods":["GET","HEAD"]},"nscore.airports.show":{"uri":"crew\/airports\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"nscore.crew.dashboard":{"uri":"crew\/dashboard","methods":["GET","HEAD"]},"admin.nscore.":{"uri":"admin\/nscore","methods":["GET","HEAD"]},"api.nscore.":{"uri":"api\/nscore\/hello","methods":["GET","HEAD"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
