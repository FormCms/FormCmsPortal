import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Price } from "../../../../libs/FormCmsAdminSdk";

export function SubButtons({
                               prices,
                               subscribe
                           }: {
    prices: Price[];
    subscribe: (priceId: string) => void;
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prices?.map(price => {
                const amount = (price.amount / 100).toFixed(2);
                const currency = price.currency.toUpperCase();

                return (
                    <Card
                        key={price.id}
                        title={price.name}
                        className="shadow-md border border-gray-200 rounded-xl"
                        header={
                            <div className="flex justify-between items-center px-3 pt-3">
                                <span className="text-lg font-semibold text-gray-700">
                                    ${amount} <span className="text-sm text-gray-500">{currency}</span>
                                </span>
                            </div>
                        }
                        footer={
                            <div className="text-center p-3">
                                <Button
                                    label="Subscribe"
                                    className="w-full"
                                    onClick={() => subscribe(price.id)}
                                />
                            </div>
                        }
                    >
                        <p className="m-0 text-gray-600">{price.description} </p>
                    </Card>
                );
            })}
        </div>
    );
}
