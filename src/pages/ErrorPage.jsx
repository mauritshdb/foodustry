import '../css/ErrorPage.css'

function ErrorPage() {
    return (
        <div className="bgimg">
            <div className="topleft">
                <p><a href='/'>Foodustry</a></p>
            </div>
            <div className="middle">
                <h1 className='mb-3'>Something error</h1>
                <hr className='mb-3'/>
                <h2>F12</h2>
            </div>
            <div className="bottomleft">
                <p>check logs</p>
            </div>
        </div>
    )
}

export default ErrorPage;