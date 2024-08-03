
const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center text-lg-start">
            <div className="container p-4 mt-5">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Footer Content</h5>
                        <p>
                            Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit.
                        </p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled mb-0">
                            <li><a href="#!" className="text-white">Link 1</a></li>
                            <li><a href="#!" className="text-white">Link 2</a></li>
                            <li><a href="#!" className="text-white">Link 3</a></li>
                            <li><a href="#!" className="text-white">Link 4</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled mb-0">
                            <li><a href="#!" className="text-white">Link 1</a></li>
                            <li><a href="#!" className="text-white">Link 2</a></li>
                            <li><a href="#!" className="text-white">Link 3</a></li>
                            <li><a href="#!" className="text-white">Link 4</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2023 Copyright:
                <a className="text-white" href="https://yourwebsite.com/"> yourwebsite.com</a>
            </div>
        </footer>
    );
}

export default Footer;