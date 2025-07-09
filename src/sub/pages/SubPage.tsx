import {useMenuHeader} from "../../globalState";
import {useSubPage} from "../../../libs/FormCmsAdminSdk/sub/pages/useSubPage";
import {SubButtons} from "./components/SubButtons";

export function SubPage() {
    const [_, setHeader] = useMenuHeader()
    const {prices, subscribe, billing, billingError} = useSubPage();
    setHeader("Subscription");
    return <div className="card">
        {billingError && prices && <SubButtons prices={prices} subscribe={subscribe}/>}
        {billing && (
            <div className="p-4 border rounded-xl shadow-md space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Current Subscription</h3>
                <div>
                    <span className="font-medium text-gray-600">Plan:</span>{" "}
                    {billing.price?.name} (${(billing!.price!.amount / 100).toFixed(2)} {billing!.price!.currency.toUpperCase()})
                </div>
                <div>
                    <span className="font-medium text-gray-600">Interval:</span>{" "}
                    {billing.price?.interval}
                </div>
                <div>
                    <span className="font-medium text-gray-600">Status:</span>{" "}
                    <span className={
                        billing.status === "active"
                            ? "text-green-600 font-semibold"
                            : billing.status === "canceled"
                                ? "text-red-500 font-semibold"
                                : "text-yellow-600 font-semibold"
                    }>
                            {billing.status}
                        </span>
                </div>
                <div>
                    <span className="font-medium text-gray-600">Next Billing Date:</span>{" "}
                    {new Date(billing!.price!.nextBillingDate!).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}
                </div>
                <div className="text-sm text-gray-500">
                    {billing.price?.description}
                </div>
            </div>
        )}
    </div>
}