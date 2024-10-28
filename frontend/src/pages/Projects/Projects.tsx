import React from "react"
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import FilterListIcon from '@mui/icons-material/FilterList'
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined'
import "./styles.css"

const Projects: React.FC = () => {
  return (
    <div className="projects_page">
        <div className="hero">
            <h1>Projects</h1>
            <div className="search">
                <div className="search-div">
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder="Search projects by name"/>
                </div>
                <button>Search</button>
            </div>
        </div>
        <div className="bottom">
            <div className="left">
                <div className="filter_title">
                    <h1>Filter</h1>
                    <FilterListIcon/>
                </div>
                <hr/>
                <div className="all_filters">
                    <h1>Stack</h1>
                    <div className="stack">
                        <div>
                            <input type="checkbox" name="meanstack" id="meanstack" />
                            <label htmlFor="meanstack">MEANstack</label>
                        </div>
                        <div>
                            <input type="checkbox" name="mernstack" id="mernstack" />
                            <label htmlFor="mernstack">MERNstack</label>
                        </div>
                        <div>
                            <input type="checkbox" name="jamstack" id="jamstack" />
                            <label htmlFor="jamstack">JAMstack</label>
                        </div>
                        <div>
                            <input type="checkbox" name="dotnetstack" id="dotnetstack" />
                            <label htmlFor="dotnetstack">.Net Stack</label>
                        </div>
                        <div>
                            <input type="checkbox" name="springbootstack" id="springbootstack" />
                            <label htmlFor="springbootstack">Sprint Boot Stack</label>
                        </div>
                        <div>
                            <input type="checkbox" name="flutterFirebasestack" id="flutterFirebasestack" />
                            <label htmlFor="flutterFirebasestack">Flutter/Firebase Stack</label>
                        </div>
                        <div>
                            <input type="checkbox" name="djangostack" id="djangostack" />
                            <label htmlFor="djangostack">Django Stack</label>
                        </div>
                        <div>
                            <input type="checkbox" name="serverlessstack" id="serverlessstack" />
                            <label htmlFor="serverlessstack">Serverless Stack</label>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="dates">
                    <h1>Date</h1>
                    <div className="dateRadios">
                        <div>
                            <input type="radio" name="sort" id="recent" />
                            <label htmlFor="recent">Sort by most recent</label>
                        </div>
                        <div>
                            <input type="radio" name="sort" id="oldest" />
                            <label htmlFor="oldest">Sort by oldest first</label>
                        </div>
                    </div>
                </div>
                <div className="clear_filters">
                    <h1><HighlightOffIcon/> Clear filter(s)</h1>
                </div>
            </div>
            <div className="projects">
                <div className="project_header">
                    <h1>Projects (20)</h1>
                    <button>Add Project</button>
                </div>
                <div className="project_grid">
                    {
                        Array.from({length: 6}).map((_, index) => (
                            <div className="project_cell" key={index}>
                                <div className="project_image">
                                    <button>
                                        <AutoAwesomeOutlinedIcon/>
                                        <p>New</p>
                                    </button>
                                    <img src="/Landing_page/programmer_workspace.jpg"/>
                                </div>
                                <div className="project_detail">
                                    <h1>Event seating planner</h1>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem unde odio, adipisci deleniti quas numquam iste cupiditate animi quibusdam eius, quod dolorem amet asperiores reprehenderit? Soluta praesentium molestias cum, ea, possimus qui beatae quia sint quod nemo aliquam quisquam officiis? Ex non ratione quaerat quia culpa voluptates sed iste nostrum.
                                    </p>
                                    <h2>
                                        Read more
                                    <   ArrowOutwardOutlinedIcon/>
                                    </h2>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <hr/>
                <div className="pagination">
                    <h1>Page 1 of 10</h1>
                    <div className="pagination_buttons">
                        <button>Previous</button>
                        <button>Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Projects
