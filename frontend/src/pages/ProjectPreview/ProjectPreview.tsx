import React from "react"
import "./styles.css"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"

const ProjectPreview: React.FC = () => {
  return (
    <div className="project-preview bg-[#F9FAFB]">
      <div className="hero-image"></div>
      <div className="page-container">
        <div className="header">
          <h1>Event seating planner</h1>
          <div className="calendar">
            <div className="time-list">
              <div>
                <CalendarTodayOutlinedIcon/>
                <span>Created 17 Sep, 2024</span>
              </div>
              <p>Last modified 17 hours ago</p>
            </div>
            <button>Edit project</button>
          </div>
        </div>

          <div className="bottom">
            <div className="left">
              <div className="left-top">
                <h3>Development Stack</h3>
                <div className="stacks">
                {
                  Array.from({length: 4}).map((_, index) => (
                    <div className="stack" key={index}>
                      <p>Stack Name</p>
                    </div>
                  ))
                }
                </div>
              </div>
              <div className="project-description">
                <h1>Project description</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet laborum nam cum, blanditiis quas sed, aspernatur eligendi harum inventore labore dolorum, possimus nulla esse sit repellat omnis dolorem dignissimos libero atque iste autem repellendus? Modi iusto at placeat unde est corrupti, quod quia perferendis ab obcaecati earum, voluptas temporibus tenetur? Tempora culpa neque repellat placeat unde, molestiae possimus consectetur magni?
                  <span>See more...</span>
                </p>
              </div>
              <div className="project-features">
                <h1>Project features</h1>
                <div className="features-grid">
                  {
                    Array.from({length: 6}).map((_, index) => (
                      <div className="feature" key={index}>
                        <CheckCircleIcon/>
                        <p>Feature Name</p>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="project-features">
                <h1>Areas of Improvement/Future updates</h1>
                <div className="features-grid">
                  {
                    Array.from({length: 6}).map((_, index) => (
                      <div className="feature" key={index}>
                        <CheckCircleIcon/>
                        <p>Improvement here</p>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="technical-details">
                <h1>Technical details and Decisions</h1>
                <div className="video">
                  <video src="" controls></video>
                </div>
              </div>
            </div>

            <div className="middle"></div>

            <div className="right">
              <div className="right-top">
                <div className="right-title">
                  <LinkOutlinedIcon/>
                  <h1>Linked Docs</h1>
                </div>
                <div className="input-div">
                  <input type="text" placeholder="Eventplanner_documentation_here.pdf"/>
                  <ArrowOutwardOutlinedIcon/>
                </div>
                <div className="input-div">
                  <input type="text" placeholder="Design_documentation.pdf"/>
                  <ArrowOutwardOutlinedIcon/>
                </div>
              </div>
              <div className="right-bottom">
                <div className="right-title">
                  <GroupOutlinedIcon/>
                  <h1>Development team/Contributors</h1>
                </div>
                <div className="team-list">
                  {
                    Array.from({length: 4}).map((_, index) => (
                      <div className="member" key={index}>
                        <div className="image-container">
                          <img src="/Projects_preview_page/frontend.jpg"/>
                        </div>
                        <div className="member-details">
                          <h1>Member Name</h1>
                          <p>Member Role</p>
                        </div>
                        <button><DeleteOutlineIcon/></button>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ProjectPreview
