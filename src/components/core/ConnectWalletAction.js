
export const ConnectWalletAction = ({ connectAction }) => {
    return (
        <div className="flex-auto justify-center justify-items-center">
            <div>
            <button className="btnConnectWallet inline-flex justify-center md:w-96 px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white
            bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => connectAction()}>
                <p className="">Connect your wallet</p>
            </button>
            </div>
        </div>
    )
}