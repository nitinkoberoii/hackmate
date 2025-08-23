import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ title, description, icon, path, badge, color = 'primary' }) => {
  const getColorClasses = (colorName) => {
    switch (colorName) {
      case 'success':
        return {
          card: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50 hover:border-green-300 hover:shadow-lg hover:shadow-green-100',
          icon: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white',
          title: 'text-green-800',
          description: 'text-green-600',
          arrow: 'text-green-500 group-hover:text-green-600'
        };
      case 'warning':
        return {
          card: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200/50 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100',
          icon: 'bg-gradient-to-br from-orange-500 to-amber-600 text-white',
          title: 'text-orange-800',
          description: 'text-orange-600',
          arrow: 'text-orange-500 group-hover:text-orange-600'
        };
      case 'accent':
        return {
          card: 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200/50 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100',
          icon: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white',
          title: 'text-purple-800',
          description: 'text-purple-600',
          arrow: 'text-purple-500 group-hover:text-purple-600'
        };
      default:
        return {
          card: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100',
          icon: 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white',
          title: 'text-blue-800',
          description: 'text-blue-600',
          arrow: 'text-blue-500 group-hover:text-blue-600'
        };
    }
  };

  const colors = getColorClasses(color);

  return (
    <Link to={path} className="block group">
      <div className={`relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${colors.card}`}>
        {badge && (
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
            {badge > 9 ? '9+' : badge}
          </div>
        )}
        
        <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
          <div className={`p-2.5 sm:p-3 rounded-2xl shadow-lg flex-shrink-0 ${colors.icon}`}>
            <Icon name={icon} size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-base sm:text-lg leading-tight ${colors.title} line-clamp-2`}>{title}</h3>
          </div>
        </div>
        
        <p className={`text-xs sm:text-sm font-medium leading-relaxed mb-4 sm:mb-6 ${colors.description} line-clamp-3`}>
          {description}
        </p>
        
        <div className="flex items-center justify-end">
          <div className={`p-1.5 sm:p-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm transition-transform duration-300 group-hover:scale-110 ${colors.arrow}`}>
            <Icon name="ArrowRight" size={16} className="sm:w-[18px] sm:h-[18px]" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuickActionCard;