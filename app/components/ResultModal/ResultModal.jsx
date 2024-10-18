import { calculatorList } from "../utils";

const ResultModal = ({ open, setOpen, tool, result, setResult, loading }) => {
    const handleClose = () => {
        setResult([]);
        setOpen(false);
    };
    console.log(result);
    const renderResults = (result) => {
        switch (tool) {
            case 0:
                return (
                    <div>
                        <p>Lucky baby names for you are <span>{result?.join(', ')}</span>.</p>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <p>Your zodiac sign is: <span>{result?.zodiac}</span></p>
                        <p>Your lucky Rudrakshas are:</p>
                        {result?.rudraksh.map((rudraksh, index) => (
                            <div key={index}>
                                <p>{rudraksh.name} <a href={rudraksh.url}>(Buy Online)</a></p>
                                <img src={rudraksh.image} alt={rudraksh.name} className="h-24 w-auto"/>
                            </div>
                        ))}
                    </div>
                )
            case 2:
                return (
                    <div>
                        <p>
                            Congratulations! Your lucky day is <span>{result?.lucky_day}</span>.
                            You have a series of fortunate dates: <span>{result?.lucky_dates?.join(', ')}</span>.
                            However, be cautious on these unlucky dates: <span>{result?.unlucky_dates?.join(', ')}</span>.
                        </p>
                    </div>
                );
            case 7:
            case 3:
                return (
                    <div>
                        <p>{result}</p>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <p>Your Personal year number is <span>{result?.personal_year}</span>.</p>
                        <p>{result?.content}</p>
                    </div>
                )
            case 5:
                return (
                    <div>
                        <p>Your color fortune is in! Your lucky colors are:{" "}
                            {result?.lucky?.map((color, index) => (
                                <span key={index} className="inline-flex items-center mr-2">
                                    <span className="w-2 h-2 mr-1" style={{ backgroundColor: color }}></span>
                                    <span>{color}</span>
                                </span>
                            ))}.
                            {" "} Embrace these hues for positive vibes. However, beware of the unlucky colors:{" "}
                            {result?.unlucky?.map((color, index) => (
                                <span key={index} className="inline-flex items-center mr-2">
                                    <span className="w-2 h-2 mr-1" style={{ backgroundColor: color }}></span>
                                    <span>{color}</span>
                                </span>
                            ))}.
                            {" "} Steer clear to avoid any unwanted energy.
                        </p>
                    </div>
                )
            case 6:
                return (
                    <div>
                        <p>
                            Alphabets favourable to you are: <span>{result?.favourable_alphabets?.join(', ')}</span>.
                            and your favourable numbers are: <span>{result?.favourable_numbers?.join(', ')}</span>.
                        </p>
                    </div>
                );
            case 8:
                return (
                    <div>
                        <p>Radical Number: <span>{result?.radical_number}</span></p>
                        <p>Destiny Number: <span>{result?.destiny_number}</span></p>
                        <p>Name Number: <span>{result?.name_number}</span></p>
                        <p>Mulank: <span>{result?.mulank}</span></p>
                        <p>Root Number: <span>{result?.root_number}</span></p>
                        <p>Soul Urge Number: <span>{result?.soul_urge_number}</span></p>
                        <p>Auspicious Place: <span>{result?.auspicious_place}</span></p>
                        <p>Yantra Suggestion: <span>{result?.yantra_suggestion}</span></p>
                    </div>
                )
            default:
                return null;
        }
    };

    return (
        <div className={`${open ? "flex" : "hidden"} fixed inset-0 z-50 bg-black bg-opacity-30`}>
            <div className="screen">
                <p className="modalHeading">
                    {calculatorList[tool]}
                </p>
                <div className="resultsDiv">
                    {loading ? (
                        <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin" />
                    ) : (result?.length !== 0) ? (
                        renderResults(result)
                    ) : (
                        <p>Could not find results</p>
                    )}
                </div>
                <div className="text-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleClose}>Ok</button>
                </div>
            </div>
        </div>
    );
};

export default ResultModal;
