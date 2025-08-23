import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const SkillRadarChart = ({ skills, className = "" }) => {
  const skillLevelMap = {
    'beginner': 1,
    'intermediate': 2,
    'advanced': 3,
    'expert': 4
  };

  const chartData = skills?.map(skill => ({
    category: skill?.category,
    level: skillLevelMap?.[skill?.level] || 0,
    fullName: skill?.name
  }));

  const CustomTick = ({ payload, x, y, cx, cy }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25;
    const angle = payload?.coordinate;
    const cos = Math.cos(-angle * RADIAN);
    const sin = Math.sin(-angle * RADIAN);
    const tx = cx + (radius + 10) * cos;
    const ty = cy + (radius + 10) * sin;

    return (
      <g>
        <text 
          x={tx} 
          y={ty} 
          className="fill-muted-foreground text-xs font-medium"
          textAnchor={tx > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {payload?.value}
        </text>
      </g>
    );
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 md:p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Radar" size={20} className="text-primary" />
        <h3 className="font-semibold text-foreground">Skill Profile</h3>
      </div>
      {skills?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon name="Target" size={48} className="text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            Complete the assessment to see your skill profile
          </p>
        </div>
      ) : (
        <>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid 
                  stroke="hsl(var(--border))" 
                  strokeWidth={1}
                />
                <PolarAngleAxis 
                  tick={<CustomTick />}
                  className="text-xs"
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 4]} 
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Skills"
                  dataKey="level"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">Beginner (1)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">Intermediate (2)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-muted-foreground">Advanced (3)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-muted-foreground">Expert (4)</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillRadarChart;