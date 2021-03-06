import { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";

import ReadMore from "./ReadMore";

const CharacterList = ({ data }) => {
  return data.map((x, i) => {
    return (
      <Fragment>
        <div className="character" key={x.attributes.malIds}>
          <div className="image">
            <img src={x.attributes.image.original} alt="" />
          </div>
          <div className="description">
            <h3>{x.attributes.names.en}</h3>
            <h5>{x.attributes.names.ja_jp}</h5>
            <ReadMore
              data={ReactHtmlParser(x.attributes.description)}
              height="192px"
            />
          </div>
        </div>
        <hr />
        <style jsx>
          {`
            .character {
              display: flex;
              flex-direction: row;
              justfy-content: flex-start;
              align-items: flex-start;
              padding: 20px 0px;
            }
            .image {
              flex-shrink: 0;
              width: 144px;
              height: 228px;
              overflow: hidden;
              border-radius: 5px;
              margin-right: 20px;
            }
            img {
              width: 144px;
              height: 228px;
              transform: scale(1.03);
              object-fit: cover;
              object-position: center center;
            }
            h3 {
              margin-top: 0px;
              margin-bottom: 10px;
            }
            h5 {
              margin: 0px;
              color: #adadad;
            }
            p {
              margin-bottom: 0px;
            }
          `}
        </style>
      </Fragment>
    );
  });
};

export default CharacterList;
