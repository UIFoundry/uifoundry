import { Accounts } from "./Accounts";
import { Footers } from "./Footers/config";
import { Headers } from "./Headers/config";
import { Media } from "./Media/config";
import { Pages } from "./Pages/config";
import { Sessions } from "./Sessions";
import { Sites } from "./Sites/config";
import { Themes } from "./Themes";
import { Users } from "./Users";
import { Verifications } from "./Verifications";

export const collections = [
	Users,
	Sessions,
	Accounts,
	Verifications,
	Pages,
	Media,
	Themes,
	Sites,
	Headers,
	Footers,
];
