import React               from "react"
import MUI                 from "material-ui"
import AbstractComponent   from "../widgets/abstract-component"
import TextInRadius        from "../widgets/text-in-radius"

const ListItem   = MUI.ListItem;
const Avatar     = MUI.Avatar;

const nullPosition = {};

export default class PositionListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const position = this.props.position || nullPosition;
    return (
      <ListItem
        innerDivStyle={{paddingRight:"72px"}}
        leftAvatar={this.createAvatar(position)}
        primaryText={this.createPrimaryText(position)}
        secondaryText={this.createSecondaryText(position)}
        rightIcon={this.createRightIcon(position)} />
    );
  }

  createPrimaryText(position) {
    return [
      <span key="pair" className="pair">{position.pairName}</span>,
      <span key="separator" className="separator">/</span>,
      <span key="sell-or-buy" className="sell-or-buy">{position.formatedSellOrBuy}</span>,
      this.createProfitOrLossElement(position)
    ];
  }
  createProfitOrLossElement(position) {
    const type = this.resolveProfitOrLossClass(position.profitOrLoss);
    return <span key="profitOrLoss" className={"profit-or-loss " + type}>
      ￥{type == "up" ? "+" : ""}{position.formatedProfitOrLoss}
    </span>;
  }
  resolveProfitOrLossClass(profitOrLoss) {
    if (profitOrLoss == 0) {
      return "flat";
    } else if (profitOrLoss > 0) {
      return "up";
    } else if (profitOrLoss < 0) {
      return "down";
    }
  }
  createSecondaryText(position) {
    let time = "";
    if ( position.formatedEnteredAt != null ) {
      time += position.formatedEnteredAt + " - ";
    }
    if ( position.formatedExitedAt != null ) {
      time += position.formatedExitedAtShort;
    }
    return [
      <span key="units" className="units">{position.units}</span>,
      <span key="units-suffix" className="suffix">単位</span>,
      <span key="separator" className="separator">/</span>,
      <span key="time" className="time">{time}</span>
    ];
  }
  createRightIcon(position) {
      if (position.status != "live") return null;
      return <span style={{width:"auto"}}><TextInRadius text="未決済" /></span>;
  }
  createAvatar(position) {
    return <Avatar src={this.createIconUrl(position)} />
  }
  createIconUrl(position) {
    const iconId = position.agent ? position.agent.iconId : null;
    return "/api/icon-images/" + (iconId || "default");
  }
}
PositionListItem.propTypes = {
  position: React.PropTypes.object,
  selected: React.PropTypes.bool
};
PositionListItem.defaultProp = {
  position: null,
  selected: false
};
